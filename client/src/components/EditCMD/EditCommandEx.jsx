import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import CmdComp from "../Create-cmds/cmdComp";
import axios from "axios";

function EditCmdEx() {
  const handleDelete = () => {
    console.log("delete");
  };
  const { id } = useParams();
  const [date,setDate]=useState('')
  const [cmdDataLength, setCmdDataLenght] = useState(0);
  const [product, setProducts] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [article, setArticle] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          try {
            const resp = await axios.get(`http://localhost:3036/commands/${id}/products/initialized`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            const extractedQuantities = resp.data.map(
              (product) => product.quantity
            );
            setCmdDataLenght(extractedQuantities.length);
            setQuantities(extractedQuantities);
            setCmdDataList(resp.data);
            console.log(resp.data);
          } catch (error) {
            alert(error.response.data.message);
            navigate("/ExternalOrders");
            console.log(error);
          }
        } catch (error) {
          console.log(error);
          alert("something went wrong");
          return;
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/purchasing-order`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(resp.data)
          setDate(String(resp.data.order.updatedAt).split('T')[0])
          try {
            const article = await axios.get(
              `http://localhost:3036/branches/${resp.data.order.branch_id}/`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            console.log(article.data);
            setArticle(article.data);
          } catch (error) {
            console.log(error);
          }

          try {
            const supplier = await axios.get(
              `http://localhost:3036/suppliers/${resp.data.order.supplier_id}/`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            // setCmdDataList(resp.data);
            console.log(supplier.data.supplier);
            setSupplier(supplier.data.supplier);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error)
        }
        try {
          const resp = await axios.get("http://localhost:3036/products", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setProducts(resp.data);
        } catch (error) {
          navigate("/dashboard");
          console.log(error);
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cmdDataList, setCmdDataList] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const handleEditQuantity = (id, value) => {
    if (value > 0) {
      const updatedQuantities = [...quantities];
      updatedQuantities[id] = value;
      setQuantities(updatedQuantities);
      console.log(quantities);
    } else {
      alert("Quantity must be strictly positive");
    }
  };
  const handleRemoveCmd = (id) => {
    setCmdDataList(cmdDataList.filter((cmdData) => cmdData.id !== id));
    const removedCmd = cmdDataList.find((cmdData) => cmdData.id === id);
    if (removedCmd) {
      setFilteredProducts([
        ...filteredProducts,
        { nom: removedCmd.selectedPro },
      ]);
    }
  };

  const handleAddCmd = (cmdData) => {
    setCmdDataList([...cmdDataList, cmdData]);
    setFilteredProducts(
      filteredProducts.filter((product) => product.nom !== cmdData.selectedPro)
    );
    quantities.push(Number(cmdData.quantity));
  };

  const handleConfirmCommand = async () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the command?"
    );
    if (confirm) {
      console.log(cmdDataList);
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        const result = cmdDataList.map((product, index) => {
          return {
            product: product.product_id,
            quantity: quantities[index],
            status: "initialized",
          };
        });
        try {
          const resp = await axios.put(
            `http://localhost:3036/commands/${id}/updateQuantities`,
            {quantities:[...result],status:"edit"},
            {
              headers: { Authorization: `Bearer ${res.data.accessToken}` },
              withCredentials: true,
            }
          );
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }

        for (let i = cmdDataLength; i < cmdDataList.length; i++) {
          console.log(cmdDataList[i]);
          try {
            const response = await axios.post(
              `http://localhost:3036/commands/${id}/products`,
              {
                product_id: cmdDataList[i].product_id,
                quantity: cmdDataList[i].quantity,
                unit_price:cmdDataList[i].price,
                status_quanitity: "initialized",
              },
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
        console.log(cmdDataList, quantities);
        return;
      } catch (error) {
        navigate("/login");
      }
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
    if (confirm) {
      return;
    }
  };

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side link="commands" />
        <div
          style={{
            marginTop: "8vh",
            marginLeft: " 60px",
            width: "100%",
            height: "92vh",
            padding: "60px",
          }}
        >
          <div
            className="crcmd1"
            style={{
              display: "flex ",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "300px",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex ", gap: "20px" }}>
              <div
                className="titre11"
                style={{ color: "#5B548E", fontSize: "20px" }}
              >
                {" "}
                Create Command N°{" "}
              </div>
              <div
                className="num-cmd-1"
                style={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  color: "#616262",
                }}
              >
                {id}
              </div>
              <div
                className="num-cmd-1"
                style={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  color: "#616262",
                }}
              >
                {date}
              </div>
            </div>
            <Link
              to={"/ExternalCommands"}
              style={{
                borderRadius: "20px",
                height: "30px",
                width: "200px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                backgroundColor: "#100B39",
                color: "white",
              }}
            >
              {" "}
              Commands List{" "}
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: " 80px",
              borderRadius: "20px",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
              padding: "40px",
              marginBottom: "30px",
            }}
          >
            
            <div
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                width: "260px",
                fontSize: "15px",
                height: "40px",
                display: "flex",
                alignItems: "center", // Pour centrer verticalement
                justifyContent: "center", // Pour centrer horizontalement
              }}
            >
              {article.name}
            </div>

            <div
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                width: "260px",
                fontSize: "15px",
                height: "40px",
                display: "flex",
                alignItems: "center", // Pour centrer verticalement
                justifyContent: "center", // Pour centrer horizontalement
              }}
            >
              {supplier.name}
            </div>
          </div>

          <div
            style={{
              height: " auto",
              borderRadius: "20px",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
              padding: "30px",
            }}
          >
            <div
              style={{
                color: "#5B548E",
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              Designations :
            </div>

            {cmdDataList.map((cmdData, index) => (
              <div
                key={cmdData.id}
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#5B548E",
                      marginLeft: "50px",
                    }}
                  >
                    {" "}
                    Product:{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0px",
                    }}
                  >
                    <button
                      onClick={() => handleRemoveCmd(cmdData.id)}
                      style={{
                        fontSize: "30px",
                        color: "red",
                        border: "none",
                        backgroundColor: "white",
                      }}
                    >
                      -
                    </button>
                    <div
                      style={{
                        color: "#666666",
                        borderRadius: "20px",
                        height: "35px",
                        width: "300px",
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                        border: "none",
                        paddingLeft: "20px",
                      }}
                    >
                      {
                        product
                          .filter(
                            (pro) => pro.product_id === cmdData.product_id
                          )
                          .map((pro) => pro.name)[0]
                      }{" "}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#5B548E",
                      marginLeft: "18px",
                    }}
                  >
                    {" "}
                    Quantity:{" "}
                  </div>
                  <div
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "35px",
                      width: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  >
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        height: "100%",
                        color: "#666666",
                        borderRadius: "20px",
                        border: "none",
                      }}
                      value={quantities[index]}
                      onChange={(e) =>
                        handleEditQuantity(index, Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <button
                    style={{
                      marginTop: "19px",
                      color: "red",
                      borderRadius: "20px",
                      height: "35px",
                      width: "100px",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      backgroundColor: "white",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {/* filteredProducts.filter(pro=> pro.name === selectedPro).map(pro => pro.product_id)[0], // Générer un identifiant unique pour la commande
             */}
            <CmdComp
              filteredProducts={product}
              onAddCmd={(cmdData) => {
                handleAddCmd(cmdData);
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              marginBottom: "40px",
              height: "100px",
            }}
          >
            <button
              style={{
                borderRadius: "20px",
                height: "35px",
                width: "120px",
                paddingRight: "10px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                backgroundColor: "white",
                justifyContent: "center",
                color: "#17BF6B",
                border: "1.5px solid #17BF6B",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              style={{
                borderRadius: "20px",
                height: "35px",
                width: "120px",
                paddingRight: "10px",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                backgroundColor: "#17BF6B",
                justifyContent: "center",
                color: "white",
                border: "none",
              }}
              onClick={handleConfirmCommand}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCmdEx;
