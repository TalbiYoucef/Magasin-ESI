// CreateCmd.js
import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
function CreateRec() {
  const { id } = useParams();
  console.log(id);
  const handleEditQuantity = (event, index) => {
    if (
      Number(event.target.value) > initialQuantities[index] ||
      type == "total"
    ) {
      alert("illegal quantity");
    } else {
      const newQuantities = [...quantities];
      newQuantities[index] = Number(event.target.value); // Update the quantity at the specified index
      setQuantities(newQuantities);
    }
  };
  const [type, setType] = useState("total");
  const [commandId, setCommandID] = useState();
  const [quantities, setQuantities] = useState([]);
  const [initialQuantities, setInitialQuantities] = useState([]);
  const [order, setOrder] = useState({});
  const [date,setDate]=useState('')
  const [user, setUser] = useState({});
  const [supplier, setSupplier] = useState({});
  const [article, setArticle] = useState({});
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);

        try {
          const pro = await axios.get(`http://localhost:3036/products`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setAllProducts(pro.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/purchaseorders/${id}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setOrder(resp.data.purchasingOrder);
          setCommandID(resp.data.purchasingOrder.command_id);
          console.log(resp.data.purchasingOrder);
          try {
            const article = await axios.get(
              `http://localhost:3036/commands/${resp.data.purchasingOrder.command_id}/`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            console.log(article.data);
          } catch (error) {
            console.log(error);
          }

          try {
            const article = await axios.get(
              `http://localhost:3036/commands/${resp.data.purchasingOrder.command_id}/products`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );

            setDate(String(article.data[0].updatedAt).split('T')[0]);
            setProducts(article.data);
            const initial = article.data.map((product) => product.amount_left);
            setInitialQuantities(initial);
            setQuantities(initial);
          } catch (error) {
            console.log(error);
          }

          try {
            const article = await axios.get(
              `http://localhost:3036/branches/${resp.data.purchasingOrder.branch_id}/`,
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
              `http://localhost:3036/suppliers/${resp.data.purchasingOrder.supplier_id}/`,
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
          alert(error.response.data.message);
          navigate("/ExternalOrders");
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
  const getproduct = (id) => {
    const product = allProducts.find((pro) => pro.product_id === id);
    if (product) {
      return product;
    }
    return "";
  };

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cmdDataList, setCmdDataList] = useState([]); //cmdDataList contient table de produit ajoute
  console.log(quantities);

  const handleConfirmCommand = async () => {
    //delevery_date // type // comments
    const confirm = window.confirm(
      "Are you sure you want to Confirm the Receipt?"
    );
    if (confirm) {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const respo = await axios.post(
            `http://localhost:3036/receipts/${id}/`,
            {
              deliveryDate: today,
              type: type,
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          const result = products.map((product, index) => {
            return {
              product: product.product_id,
              quantity: quantities[index],
            };
          });
          console.log(result);
          try {
            const resp = await axios.put(
              `http://localhost:3036/commands/${commandId}/updateQuantities`,
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
          // products.map(async (pro, index) => {
            // try {
            //   const respo = await axios.put(
            //     `http://localhost:3036/commands/${commandId}/products`,
            //     {
            //       product_id: pro.product_id,
            //       delivered_amount: quantities[index],
            //       amount_left: initialQuantities[index] - quantities[index],
            //     },
            //     {
            //       headers: {
            //         Authorization: `Bearer ${res.data.accessToken}`,
            //       },
            //       withCredentials: true,
            //     }
            //   );
            //   console.log(respo.data);
            // } catch (error) {
            //   console.log("product amount have not changed");
            // }
          // });
        } catch (error) {
          console.log(error);
        }
        navigate(-1);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
      //modifier Product-Command
    }
  };
  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
  };

  const handleCmdList = () => {
    const confirm = window.confirm(
      "Are you sure you want to Leave this form ?"
    );
    if(confirm){
      navigate(-1)
    }
  };
  const today = new Date().toLocaleDateString("fr-FR");
  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side style={{ marginTop: "90px" }} link="commands" />
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
                Create Receipt{" "}
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
                <select
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    outline: "none",
                    border: "none",
                    width: "100%",
                  }}
                >
                  <option value="total">total</option>
                  <option value="partial">partial</option>
                </select>
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
              Commands List <MdNavigateNext />{" "}
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "3%",
              marginBottom: "3%",
              gap: "5%",
              width: "95%",
              height: "140px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
            }}
          >
            <div className="su130" style={{ width: "45%" }}>
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                Supplier
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
                value={supplier.name}
              />
              {/* Remplir le champ avec le nom du fournisseur de la commande sélectionnée */}
            </div>

            <div className="su230" style={{ width: "20%" }}>
              <p
                htmlFor=""
                style={{
                  color: "#5B548E",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              >
                N° Command
              </p>
              <input
                type="text"
                className="nCom30"
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
                value={id}
              />{" "}
              {/* Remplir le champ avec le numéro de la commande sélectionnée */}
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
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                color: "#5B548E",
                fontSize: "20px",
                marginLeft: "60px",
                marginTop: "20px",
              }}
            >
              Designations :
            </div>

            {/* La liste des composants de commande */}
            {products.map((cmdData, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "35%",
                    marginLeft: "7%",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "20px",
                      marginLeft: "60px",
                      marginBottom: "10px",
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
                        width: "500px",
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                        border: "none",
                        paddingLeft: "20px",
                      }}
                    >
                      {getproduct(cmdData.product_id).name}{" "}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      color: "#5B548E",
                      fontSize: "20px",
                      marginLeft: "10px",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    {" "}
                    Quantité:{" "}
                  </div>
                  <div
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "45px",

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
                      value={quantities[index]}
                      onChange={(e) => handleEditQuantity(e, index)}
                      style={{
                        outline: "none",
                        border: "none",
                        width: "80%",
                      }}
                    />{" "}
                    {/* {cmdData.quantity}{" "} */}
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

export default CreateRec;
