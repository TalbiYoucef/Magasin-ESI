// CreateCmd.js
import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
function CreateBonSortie() {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [quantities, setQuantitie] = useState([]);
  const [initialQuantities, setInitialQuantitie] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate(); //cmdDataList contient table de produit ajoute
  const [service, setServive] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        console.log(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/services/${res.data.user.service_id}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setServive(resp.data.name);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/products/accepted`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setDate(String(resp.data[0].updatedAt).split("T")[0]);
          setProducts(resp.data);
          let initial = resp.data.map((ele) => ele.quantity);
          setInitialQuantitie(initial);
          setQuantitie(initial);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }

        try {
          const resp = await axios.get(`http://localhost:3036/products`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setAllProducts(resp.data);
          console.log(resp.data);
        } catch (error) {
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

  const getProductName = (id) => {
    const pro = allProducts.find((pro) => pro.product_id == id);
    if (pro) {
      return pro.name;
    } else {
      return "";
    }
  };
  const handleQuantityChange = (e, index) => {
    console.log(e.target.value);
    if (initialQuantities[index] >= e.target.value) {
      const newQuantities = [...quantities];
      newQuantities[index] = Number(e.target.value); // Update the quantity at the specified index
      setQuantitie(newQuantities);
    }
  };

  const handleConfirmCommand = async () => {
    const confirm = window.confirm(
      "Are you sure you want to create this exit note?"
    );
    if (confirm) {
      console.log(quantities);
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const internalOrderResponse = await axios.get(
            `http://localhost:3036/commands/${id}/internal-order`,
            {
              headers: { Authorization: `Bearer ${res.data.accessToken}` },
              withCredentials: true,
            }
          );
          const respp = await axios.get(
            `http://localhost:3036/internalorders/${internalOrderResponse.data.internal_order_id}`,
            {
              headers: { Authorization: `Bearer ${res.data.accessToken}` },
              withCredentials: true,
            }
          );
          console.log(respp.data);
          if (respp.data.status == "satisfied") {
            alert("you can not recreate an exit note");
            return;
          } else {
            products.map(async (pro, index) => {
              //create the cmnd products
              console.log(pro);
              try {
                const respo = await axios.post(
                  `http://localhost:3036/commands/${id}/products`,
                  {
                    product_id: pro.product_id,
                    quantity: quantities[index],
                    unit_price: 0,
                    status_quantity: "satisfied",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${res.data.accessToken}`,
                    },
                    withCredentials: true,
                  }
                );
                console.log(respo.data);
              } catch (error) {
                console.log(error);
              }
            });
            //  change the command status
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
              console.log(response);
              // modify the internal order status
              try {
                const resp = await axios.put(
                  `http://localhost:3036/internalorders/${response.data.internal_order_id}/status`,
                  { status: "satisfied" },
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
            try {
              const response = await axios.post(
                `http://localhost:3036/exitnotes/`,
                {
                  exit_date: new Date().toISOString(),
                  type: "exit",
                  comment: "",
                  internal_order_id:
                    internalOrderResponse.data.internal_order_id,
                },
                {
                  headers: { Authorization: `Bearer ${res.data.accessToken}` },
                  withCredentials: true,
                }
              );
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
        navigate(-1);
      } catch (error) {
        // Redirect to login if there's an error
        navigate("/login");
      }
    }
  };
  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
    if (confirm) {
      navigate(-1);
    }
  };

  const handleCmdList = () => {
    const confirm = window.confirm(
      "Are you sure you want to Leave this form ?"
    );
    if (confirm) {
      navigate(-1);
    }
  };
  const today = new Date().toLocaleDateString("fr-FR");
  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side link="/ExternalOrders" />
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
              gap: "100px",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex ", gap: "20px" }}>
              <div
                className="titre11"
                style={{
                  color: "#5B548E",
                  marginLeft: "10px",
                  marginRight: "60px",
                  fontSize: "20px",
                }}
              >
                {" "}
                Bon De Sortie{" "}
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
                {today}
              </div>
            </div>
            <Link
              onClick={handleCmdList}
              style={{
                borderRadius: "20px",
                height: "45px",
                width: "200px",
                marginRight: "70px",
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
              View Fourniteur <MdNavigateNext />{" "}
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "3%",
              flexWrap: "nowrap",
              marginBottom: "3%",
              gap: "8%",
              width: "95%",
              height: "140px",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
            }}
          >
            <div className="su130" style={{ marginLeft: "7%", width: "45%" }}>
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                Service
              </p>
              <input
                type="text"
                name=""
                id=""
                className="suppname30"
                style={{
                  width: "100%",
                  height: "50px",
                  marginLeft: "5%",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  border: "none",
                }}
                value={service}
              />
              {/* Remplir le champ avec le nom du fournisseur de la commande sélectionnée */}
            </div>

            <div className="su330">
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                Date
              </p>
              <input
                type="text"
                className="date30"
                style={{
                  width: "100%",
                  height: "50px",
                  marginLeft: "5%",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
                  border: "none",
                }}
                value={date}
              />
            </div>
            <div className="su330"></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "3%",
              gap: "5%",
              width: "95%",
              overflowY: "100% auto",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
              position: "relative",
            }}
          >
            <div
              style={{
                marginBottom: "0px",
                color: "#5B548E",
                fontSize: "20px",
                marginLeft: "60px",
                marginTop: "20px",
                paddingBottom: "20px",
              }}
            >
              Designations :
            </div>
            {/* La liste des composants de commande */}
            {products.map((cmdData, index) => (
              <div
                key={cmdData.product_id}
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "26%",
                    marginLeft: "1.75%",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "15px",
                      marginLeft: "40px",
                      marginBottom: "5px",
                      marginTop: "20px",
                    }}
                  >
                    {" "}
                    Product:{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      margin: "0px",
                    }}
                  >
                    <div
                      style={{
                        color: "#666666",
                        borderRadius: "20px",
                        height: "45px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                        border: "none",
                        paddingLeft: "20px",
                      }}
                    >
                      {getProductName(cmdData.product_id)}{" "}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "9%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "15px",
                      marginLeft: "10px",
                      marginTop: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                    Quant Demande:{" "}
                  </div>
                  <div
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "45px",

                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  >
                    {" "}
                    {cmdData.quantity}{" "}
                  </div>
                </div>
                <div
                  style={{
                    width: "9%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "15px",
                      marginLeft: "10px",
                      marginTop: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                    Quant Servie:{" "}
                  </div>
                  <div
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "45px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  >
                    <input
                      onChange={(e) => handleQuantityChange(e, index)}
                      type="number"
                      value={quantities[index]}
                      style={{
                        height: "45px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "20px",
                        justifyContent: "center",
                        outline: "none",
                        border: "none",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    width: "22%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                ></div>
                <div
                  style={{
                    width: "22%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                ></div>
              </div>
            ))}
            {/* <CmdComp
              filteredProducts={filteredProducts}
              onAddCmd={(cmdData) => {
                handleAddCmd(cmdData);
              }}
            /> */}
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

export default CreateBonSortie;
