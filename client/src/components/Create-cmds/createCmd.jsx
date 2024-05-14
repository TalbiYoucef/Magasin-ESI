// CreateCmd.js
import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CmdComp from "./cmdComp";
function CreateCmd() {
  const [expectedDate, setExpectedDate] = useState("");
  const [modePayment, setModePayment] = useState("");
  const [prixTotal, setPrixTotal] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [cmdDataList, setCmdDataList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [Products, setProduct] = useState([]);
  const [type, setType] = useState("external");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [priU, setPriU] = useState("");
  const [allProducts,setAllProducts] = useState([])
  const getPrixUnitaire = (selectedPro) => {
    const product = Products.find((prod) => prod.nom === selectedPro);
    return product ? product.prixUnitaire : "";
  };

  const dateOnchange = (e) => {
    setExpectedDate(e.target.value);
  };
  const handleModePaymentChange = (e) => {
    setModePayment(e.target.value);
    console.log(modePayment);
  };
  const handleChapterChange = async (e) => {
    setSelectedChapter(e.target.value);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      console.log("reres", res.data);
      try {
        const resp = await axios.get(
          `http://localhost:3036/chapters/${
            chapters.find((chap) => e.target.value == chap.name).chapter_id
          }/branches`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setBranches(resp.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }

    setSelectedArticle("");
    setCmdDataList([]);
    setFilteredProducts([]);
  };

  const handleArticleChange = async (e) => {
    setSelectedArticle(e.target.value);
    console.log(e.target.value);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      console.log("reres", res.data);
      try {
        const resp = await axios.get(
          `http://localhost:3036/branches/${
            branches.find((branch) => e.target.value == branch.name).branch_id
          }/products`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setAllProducts(resp.data)
        setProducts(resp.data);
        // console.log(resp.data)
      } catch (error) {
        setProducts([]);
        console.log(error);
      }
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
  };

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
    console.log("selectedSupplier", selectedSupplier);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          const supp = await axios.get("http://localhost:3036/suppliers", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setSuppliers(supp.data.suppliers);
          const chap = await axios.get("http://localhost:3036/chapters", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setChapters(chap.data);
        } catch (error) {
          // navigate("/dashboard");
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

  const handleRemoveCmd = (id) => {
    setCmdDataList(cmdDataList.filter((cmdData) => cmdData.id !== id));
    const removedProduct = allProducts.find(product => product.product_id === id);
    if (removedProduct) {
      setProducts([...products, removedProduct].sort((a, b) => {
        return a.name.localeCompare(b.name);
      }));
      
    }
  };
  const handleAddCmd = (cmdData) => {
    setPrixTotal((prev) => (prev += cmdData.price * cmdData.quantity));
    setCmdDataList([...cmdDataList, cmdData]);
    // console.log(cmdData)
    console.log(getProduct(cmdData.product_id))
    console.log(filteredProducts)

    setProducts(
      products.filter((pro) => pro.name !== getProduct(cmdData.product_id))
    );
  };
  const getSuppId = (name) => {
    const supp= suppliers.find((sup) => sup.name == name)
    if(supp) {
      return supp.supplier_id
    }
    else{
      return null;
    }
  };
  const getChapId = (name) => {
    return chapters.find((element) => element.name == name).chapter_id;
  };
  const getBranchId = (name) => {
    return branches.find((element) => element.name == name).branch_id;
  };
  const handleConfirmCommand = async () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the command?"
    );
    if (confirm) {
      console.log(getSuppId(selectedSupplier));
      if(!(getSuppId(selectedSupplier) && expectedDate)){
        alert("all field are obligatory")
        return
      }
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const resp = await axios.post(
            `http://localhost:3036/commands/`,
            {
              user_id: res.data.user.user_id,
              type,
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(resp.data);
          cmdDataList.map(async (Element) => {
            // creer cmnd
            try {
              const data = await axios
                .post(
                  `http://localhost:3036/commands/${resp.data.command_id}/products`,
                  {
                    product_id: Element.product_id,
                    quantity: Element.quantity,
                    unit_price: Element.price,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${res.data.accessToken}`,
                    },
                    withCredentials: true,
                  }
                )
                .then(async (resp) => {
                  try {
                    await axios
                      .post(
                        `http://localhost:3036/purchaseorders`,
                        {
                          expected_delivery_date: expectedDate,
                          total_price: prixTotal,
                          notes: "",
                          command_id: resp.data.command_id,
                          supplier_id: getSuppId(selectedSupplier),
                          chapter_id: getChapId(selectedChapter),
                          branch_id: getBranchId(selectedArticle),
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${res.data.accessToken}`,
                          },
                          withCredentials: true,
                        }
                      )
                      .then((res) => console.log(res.data));
                  } catch (error) {
                    console.log("failed to create bone de commande", error);
                  }
                });
              navigate("/commands");
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    }
  };
  const getProduct=(id)=>{
  const pro = products.find(pro=> pro.product_id === id)
   if(pro){
    return pro.name
   }
   else{
    return ""
   }
  }
  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
    if (confirm) {
      setCmdDataList([]);
      setFilteredProducts([]);
      setProducts([]);
    }
  };

  const handleCmdList = () => {
    const confirm = window.confirm(
      "Are you sure you want to Leave this form ?"
    );
    if (confirm) {
      setCmdDataList([]);
      setFilteredProducts([]);
      setProducts([]);
      navigate("/commands");
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
                Create Command
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
              to={"/commands"}
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
              Commands List{" "}
            </Link>
          </div>
          <div
            style={{
              height: " 80px ",
              borderRadius: "20px",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginBottom: "30px",
              gap: "calcl(height/3-40px)",
            }}
          >
            <select
              value={selectedChapter}
              onChange={handleChapterChange}
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                width: " 260px",
                fontSize: "15px",
                height: "40px",
                marginBottom: "30px",
              }}
            >
              <option value="">Choisissez un chapitre</option>
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter.name}>
                  {chapter.name}
                </option>
              ))}
            </select>

            <select
              value={selectedArticle}
              onChange={handleArticleChange}
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                width: " 260px",
                fontSize: "15px",
                height: "40px",
                marginBottom: "30px",
              }}
            >
              <option value="">Choisissez un article</option>
              {selectedChapter &&
                branches.map((article, index) => (
                  <option key={index} value={article.name}>
                    {article.name}
                  </option>
                ))}
            </select>

            <select
              value={selectedSupplier}
              onChange={handleSupplierChange}
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                width: " 260px",
                fontSize: "15px",
                height: "40px",
                marginBottom: "30px",
              }}
            >
              <option value="">Choisissez un fournisseur</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={expectedDate}
              onChange={dateOnchange}
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                width: " 200px",
                fontSize: "15px",
                borderRadius: "20px",
                height: "40px",
                marginLeft: "30px",
                marginBottom: "30px",
                border: "none",
                padding:"0px 10px",
                color:"#B71C1C"
              }}
            />
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
                    Produit:{" "}
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
                      {getProduct(cmdData.product_id)}{" "}
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
                    Quantité:{" "}
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
                    {" "}
                    {cmdData.quantity}{" "}
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
                    Prix:{" "}
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
                    {" "}
                    {cmdData.price}{" "}
                  </div>
                </div>
              </div>
            ))}
            <CmdComp
              filteredProducts={products}
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

export default CreateCmd;
