import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function EditCmdinterne() {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
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
            const resp = await axios.get(
              res.data.perms.includes(15)
                ? `http://localhost:3036/commands/${id}/products/accepted`
                : `http://localhost:3036/commands/${id}/products/initialized`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            const extractedQuantities = resp.data.map((product) => {
              return { id: product.product_id, qt: product.quantity };
            });
            setQuantities(extractedQuantities);
            setCmdDataList(resp.data);
            console.log(resp.data);
          } catch (error) {
            alert(error.response.data.message);
            navigate("/InternalOrders");
            console.log(error);
          }
        } catch (error) {
          console.log(error);
          alert("something went wrong");
          return;
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

  // Format the date as "day month year"
  const formattedDate = new Date().toLocaleDateString("fr-FR");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cmdDataList, setCmdDataList] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const handleEditQuantity = (id, value) => {
    if (value > 0) {
      const replaceObservation = (id, newObs) => {
        setQuantities((prevArray) =>
          prevArray.map((obj) => (obj.id === id ? { ...obj, qt: newObs } : obj))
        );
      };

      replaceObservation(id, value);
      console.log(quantities);
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

  const handleConfirmCommand = async () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the command?"
    );
    if (confirm) {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        if (!res.data.isHeadOfService) {
          console.log('not head of service',cmdDataList)

          const result = cmdDataList.map((product, index) => {
            return {
              product: product.product_id,
              quantity: quantities.find((pro) => pro.id === product.product_id)
                ?.qt,
              status: "initialized",
            };
          });
          try {
            const resp = await axios.put(
              `http://localhost:3036/commands/${id}/updateQuantities`,
              { quantities: [...result], status: "edit" },
              {
                headers: { Authorization: `Bearer ${res.data.accessToken}` },
                withCredentials: true,
              }
            );
            console.log(resp.data);
          } catch (error) {
            console.log(error);
          }
          console.log(cmdDataList, quantities);
          return;
        } else {
          console.log(cmdDataList);
          cmdDataList.map(async (pro, index) => {
            //create the cmnd products
            console.log(pro);
            try {
              const response = await axios.post(
                `http://localhost:3036/commands/${id}/products`,
                {
                  product_id: pro.product_id,
                  quantity: quantities.find(
                    (prod) => prod.id === pro.product_id
                  )?.qt,
                  unit_price: 0,
                  status_quantity: "validated",
                  num_inventaire:''
                },
                {
                  headers: {
                    Authorization: `Bearer ${res.data.accessToken}`,
                  },
                  withCredentials: true,
                }
              );
              console.log(response.data);

              // change the command status
              } catch (error) {
                console.log(error);
                }
                });
              try {
                const response = await axios.get(
                  `http://localhost:3036/commands/${id}/internal-order`,

                  {
                    headers: {
                      Authorization: `Bearer ${res.data.accessToken}`,
                    },
                    withCredentials: true,
                  }
                );
                // modify the internal order status
                try {
                  const resp = await axios.put(
                    `http://localhost:3036/internalorders/${response.data.internal_order_id}/status`,
                    { status: "validated" },
                    {
                      headers: {
                        Authorization: `Bearer ${res.data.accessToken}`,
                      },
                      withCredentials: true,
                    }
                  );
                  console.log(resp);
                } catch (error) {
                  console.log(error);
                }
              } catch (error) {
                console.log(error);
              }
                }
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
      navigate("/InternalOrders");
    }
  };

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side link="/MyOrders" />
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
              to="/MyOrders"
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
              Mes Commandes Fourniture{" "}
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
                      value={
                        quantities.find((pro) => pro.id === cmdData.product_id)
                          ?.qt
                      }
                      onChange={(e) =>
                        handleEditQuantity(cmdData.product_id, Number(e.target.value))
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

export default EditCmdinterne;
