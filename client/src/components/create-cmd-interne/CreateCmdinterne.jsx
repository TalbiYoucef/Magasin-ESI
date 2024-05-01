// CreateCmd.js
import React, { useEffect, useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import produitData from "../data/ProduitData";
import { Link, useNavigate } from "react-router-dom";
import CmdComp from "./CmdinterneComp";
import axios from "axios";

function CreateCmdinterne() {
  const [accessToken, setAccessToken] = useState("");
  const [chapters, setChapters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [Products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const resp = await axios.get("http://localhost:3036/chapters", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setChapters(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cmdDataList, setCmdDataList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const getChapterId = (name) => {
    const chap = chapters.find((chap) => chap.name === name);
    if (chap) {
      return chap.chapter_id;
    } else {
      return "";
    }
  };
  const getArticleId = (name) => {
    const art = articles.find((chap) => chap.name === name);
    if (art) {
      return art.branch_id;
    } else {
      return "";
    }
  };
  const handleChapterChange = async (e) => {
    setSelectedChapter(e.target.value);
    console.log(getChapterId(e.target.value));
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.get(
          `http://localhost:3036/chapters/${getChapterId(
            e.target.value
          )}/branches`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setArticles(resp.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  const handleArticleChange = async (e) => {
    setSelectedArticle(e.target.value);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.get(
          `http://localhost:3036/branches/${getArticleId(
            e.target.value
          )}/products`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(resp.data);
        setProducts(resp.data);
        setFilteredProducts(resp.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  const handleRemoveCmd = (id) => {
    // Supprimer la commande avec l'ID spécifié de cmdDataList
    setCmdDataList(cmdDataList.filter((cmdData) => cmdData.id !== id));
    console.log("cmdDataList:", cmdDataList);
    // Rechercher la commande supprimée dans cmdDataList
    const removedCmd = cmdDataList.find(
      (cmdData) => cmdData.id === id
    ).selectedPro;
    const removedProduct = removedCmd.selectedPro;
    // Trouver les données de l'article correspondant à selectedChapter et selectedArticle
    const chapterData = produitData.find(
      (chapter) => chapter.chapitre === selectedChapter
    );
    const articleData = chapterData
      ? chapterData.articles.find((article) => article.nom === selectedArticle)
      : null;

    // Si la commande supprimée existe et si l'article correspondant contient des produits
    if (removedCmd && articleData && articleData.produits.length > 0) {
      console.log("Condition 1111");
      console.log("articleData.produits", articleData.produits);
      console.log("ID to find:", id);
      const removedProduct = articleData.produits.find(
        (produit) => produit.nom === removedCmd
      );
      console.log("Removed product:", removedProduct);
      if (removedProduct) {
        console.log("Condition 2222");
        // Ajouter le produit supprimé à filteredProducts
        setFilteredProducts([...filteredProducts, { nom: removedCmd }]);
      }
    }
  };
  const getProductId = (name) => {
    const pro = Products.find((pro) => pro.name === name);
    if (pro) {
      return pro.product_id;
    } else {
      return "";
    }
  };
  const handleAddCmd = (cmdData) => {
    setCmdDataList([...cmdDataList, cmdData]);
    console.log([...cmdDataList, cmdData]);
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
            `http://localhost:3036/commands`,
            {
              user_id: res.data.user.user_id,
              type: "internal",
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          cmdDataList.map(async (pro) => {
            try {
              const response = await axios.post(
                `http://localhost:3036/commands/${resp.data.command_id}/products`,
                {
                  product_id: getProductId(pro.selectedPro),
                  quantity: pro.quantity,
                  unit_price: 0,
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
          });
          try {
            const response = axios.post(
              `http://localhost:3036/internalorders/`,
              {
                command_id: resp.data.command_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
          } catch (error) {}
        } catch (error) {}
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
      if (cmdDataList.length > 0) {
      } else {
        alert("please fill in all  the fileds Correctly ");
      }
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel the command?"
    );
    if (confirm) {
      //   window.location.href =  '/List des  demandes de fourniture  de ce user ';
    }
  };

  const handleCmdList = () => {
    const confirm = window.confirm(
      "Are you sure you want to Leave this form ?"
    );
    if (confirm) {
      // window.location.href =  '/List des  demandes de fourniture  de ce user ';
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
            marginLeft: " 15%",
            width: "70%",
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
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex ", gap: "20px" }}>
              <div
                className="titre11"
                style={{ color: "#5B548E", fontSize: "20px" }}
              >
                {" "}
                Demande de Fourniture{" "}
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
            </div>
            <Link
              to="/mes-cmnd"
              onClick={handleCmdList}
              style={{
                borderRadius: "20px",
                height: "30px",
                width: "250px",
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
              Mes Demandes Fourniture{" "}
            </Link>
          </div>
          <div
            style={{
              height: "  auto ",
              borderRadius: "20px",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
              paddingTop: "25px",
              marginBottom: "30px",
            }}
          >
            <select
              value={selectedChapter}
              onChange={handleChapterChange}
              style={{
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                width: " 280px",
                fontSize: "15px",
                height: "40px",
                marginBottom: "30px",
                marginLeft: "120px",
                color: "black",
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
                width: " 280px",
                fontSize: "15px",
                height: "40px",
                marginBottom: "30px",
                color: "black",
              }}
            >
              <option value="">Choisissez un article</option>
              {selectedChapter &&
                articles.map((article, index) => (
                  <option key={index} value={article.name}>
                    {article.name}
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
                marginBottom: "30px",
                marginLeft: "40%",
              }}
            >
              Designations :
            </div>

            {/* La liste des composants de commande */}
            {cmdDataList.map((cmdData) => (
              <div
                key={cmdData.id}
                style={{
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "10%",
                }}
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => handleRemoveCmd(cmdData.id)}
                      style={{
                        fontSize: "30px",
                        color: "red",
                        border: "none",
                        backgroundColor: "white",
                        marginRight: "10px",
                      }}
                    >
                      -
                    </button>
                    <div
                      style={{
                        color: "#666666",
                        borderRadius: "20px",
                        height: "35px",
                        width: "350px",
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
                      fontSize: "15px",
                      color: "#5B548E",
                      marginLeft: "35px",
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
                      width: "150px",
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
              </div>
            ))}
            <CmdComp
              filteredProducts={filteredProducts}
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

export default CreateCmdinterne;
