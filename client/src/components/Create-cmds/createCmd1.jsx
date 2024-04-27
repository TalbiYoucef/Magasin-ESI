// CreateCmd.js
import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";

import produitData from "../data/ProduitData";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CmdComp from "./cmdComp";
function CreateCmd() {
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
  const getPrixUnitaire = (selectedPro) => {
    const product = Products.find((prod) => prod.nom === selectedPro);
    return product ? product.prixUnitaire : "";
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

  const typeOnChange = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  const handleRemoveCmd = (id) => {
    // Filtrer la liste des commandes pour supprimer celle avec l'ID spécifié
    setCmdDataList(cmdDataList.filter((cmdData) => cmdData.id !== id));
    // Ajouter le produit supprimé à nouveau à la liste des produits filtrés
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
    // Mettre à jour le prix unitaire lors de l'ajout d'une commande
  };

  const handleConfirmCommand = async () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the command?"
    );

    if (confirm) {
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
            try {
              const data = await axios.post(
                `http://localhost:3036/commands/${resp.data.command_id}/products`,
                {
                  product_id: Element.product_id,
                  quantity: Element.quantity,
                  unit_price:Element.price
                },
                {
                  headers: {
                    Authorization: `Bearer ${res.data.accessToken}`,
                  },
                  withCredentials: true,
                }
              );
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
                      {cmdData.selectedPro}{" "}
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
