// CreateCmd.js
import React, { useEffect, useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function CreateDecharge() {
  const { id } = useParams();
  const [expectedDate, setExpectedDate] = useState("");
  const [date, setDate] = useState("");
  const [observation, setObservation] = useState([]);
  const [quantities, setQuantitie] = useState([]);
  const [initialQuantities, setInitialQuantitie] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
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
            `http://localhost:3036/commands/${id}/products`,
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
  const handleObservationChange = (e, index) => {
    const newObservations = [...observation];
    newObservations[index] = e.target.value;
    setObservation(newObservations);
  };

  const handleConfirmCommand = async () => {
    const confirm = window.confirm(
      "Are you sure you want to create this exit note?"
    );
    if (!expectedDate) {
      alert("all fields are obligatory");
      return;
    }
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
            return
          } else {
            const result = products.map((product, index) => {
              return {
                product: product.product_id,
                quantity: quantities[index],
              };
            });
            console.log(result);
            try {
              const resp = await axios.put(
                `http://localhost:3036/commands/${id}/updateQuantities`,
                [...result],
                {
                  headers: { Authorization: `Bearer ${res.data.accessToken}` },
                  withCredentials: true,
                }
              );
              console.log(resp.data);
            } catch (error) {
              console.log(error);
            }
            try {
              const response = await axios.post(
                `http://localhost:3036/exitnotes/`,
                {
                  exit_date: today,
                  type: "discharge",
                  comment: "",
                  internal_order_id:
                    internalOrderResponse.data.internal_order_id,
                  expected_returning_date: expectedDate,
                },
                {
                  headers: { Authorization: `Bearer ${res.data.accessToken}` },
                  withCredentials: true,
                }
              );
              console.log(response.data);
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
        <Side link="commands" />
        <div
          style={{
            marginTop: "8vh",
            marginLeft: " 7%",
            width: "90%",
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
              gap: "200px",
              marginBottom: "30px",
            }}
          >
            <div style={{ display: "flex ", gap: "20px" }}>
              <div
                className="titre11"
                style={{ color: "#5B548E", fontSize: "20px" }}
              >
                {" "}
                Create Discharge Note{" "}
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
                  marginLeft: "30px",
                }}
              >
                {today}
              </div>

              <div
                className="num-cmd-1"
                style={{
                  borderRadius: "20px",
                  height: "30px",
                  padding: "0px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  color: "#616262",
                  marginLeft: "30px",
                }}
              >
                <input
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                />
              </div>
            </div>
            <Link
              onClick={handleCmdList}
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
              Internal Orders List{" "}
            </Link>
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
                    Observations:{" "}
                  </div>
                  <div
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "45px", // Hauteur fixe, ajustez selon vos besoins
                      overflowY: "auto", // Utilisation de 'auto' pour activer le défilement vertical si nécessaire
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  >
                    {" "}
                    <input
                      onChange={(e) => handleObservationChange(e, index)}
                      type="text"
                      value={observation[index]}
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
              </div>
            ))}
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

export default CreateDecharge;
