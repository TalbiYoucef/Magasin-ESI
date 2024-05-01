import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import ProduitData from "../data/ProduitData";
import { Link, useNavigate, useParams } from "react-router-dom";
import CmdComp from "../Create-cmds/cmdComp";
import axios from "axios";
function EditCmd() {
  const { id } = useParams();
  const [productId, setProductId] = useState("");
  const [product, setProducts] = useState([]);
  const [user,setUser] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user)
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
        try {
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setCmdDataList(resp.data);
          console.log(resp.data);
        } catch (error) {
          alert(error.response.data.message);
          navigate("/commands");
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

  // Format the date as "day month year"
  const formattedDate = new Date().toLocaleDateString('fr-FR');

  

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cmdDataList, setCmdDataList] = useState([]);
  const [showQuantityInput, setShowQuantityInput] = useState(true);
  const [editedQuantity, setEditedQuantity] = useState("");

  const handleEditQuantity = (id, value) => {
    if (value > 0) {
      setEditedQuantity("");
      setCmdDataList(
        cmdDataList.map((cmdData) => {
          if (cmdData.Product_id === id) {
            alert("Quantity updated successfully ");
            setShowQuantityInput(false);
            return { ...cmdData, quantity: value };
          }
          return cmdData;
        })
      );
    } else {
      alert("Quantity must be strictly positive");
    }
  };
  const handleDelete = () => {
    console.log("delete");
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

  console.log("cmdDataList", cmdDataList);

  const handleAddCmd = (cmdData) => {
    setCmdDataList([...cmdDataList, cmdData]);
    setFilteredProducts(
      filteredProducts.filter((product) => product.nom !== cmdData.selectedPro)
    );
  };

  const handleConfirmCommand = () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the command?"
    );
    cmdDataList.map(async Element =>{
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const resp = await axios.post(`http://localhost:3036/commands/${id}/products`,{
            product_id : Element.product_id ,
            quantity : Element.quantity,
            unit_price : Element.price
          }, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          navigate('/commands')
        } catch (error) {
          console.log(error);
        }
   
      } catch (error) {
        navigate("/login");
        console.log(error);
      }

    })
  };

  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
    if (confirm) {
      navigate('/commands')
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
                Edit Command N° {id}{" "}
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
                {formattedDate}
              </div>
            </div>
            <Link
              to="/commands"
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

            {/* La liste des composants de commande */}
            {cmdDataList.map((cmdData) => (
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
                    {cmdData.quantity}{" "}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <button
                    style={{
                      marginTop: "19px",
                      color: "orange",
                      borderRadius: "20px",
                      height: "35px",
                      width: "100px",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      backgroundColor: "white",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      setEditedQuantity("");
                      setShowQuantityInput(cmdData.id);
                    }}
                  >
                    Edit Quantity
                  </button>
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
                  {showQuantityInput === cmdData.id && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        style={{
                          marginTop: "19px",
                          color: "#5B548E",
                          borderRadius: "20px",
                          height: "35px",
                          width: "90px",
                          boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                          border: "none",
                          backgroundColor: "white",
                          paddingLeft: "10px",
                        }}
                        value={editedQuantity}
                        onChange={(e) =>
                          setEditedQuantity(parseInt(e.target.value))
                        }
                        type="number"
                        placeholder="Quantity"
                      />

                      <button
                        style={{
                          marginTop: "19px",
                          color: "green",
                          borderRadius: "20px",
                          height: "35px",
                          width: "60px",
                          boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                          border: "none",
                          backgroundColor: "white",
                        }}
                        onClick={() =>
                          handleEditQuantity(cmdData.id, editedQuantity)
                        }
                      >
                        Save
                      </button>
                      <button
                        style={{
                          marginTop: "19px",
                          color: "red",
                          borderRadius: "20px",
                          height: "35px",
                          width: "60px",
                          boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                          border: "none",
                          backgroundColor: "white",
                        }}
                        onClick={() => setShowQuantityInput(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
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

export default EditCmd;
