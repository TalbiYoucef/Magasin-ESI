// CreateCmd.js
import React, { useState, useEffect } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";

function EditInventaire() {
  const [data, setData] = useState([]);
  const [initial, setInitial] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [produits, setProduits] = useState([]);
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user);
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
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  const thisYear = new Date().getFullYear();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [products, setProducts] = useState([]);

  const replaceQtById = (id, newQt) => {
    setInitial((prevArray) =>
      prevArray.map((obj) => (obj.id === id ? { ...obj, qt: newQt } : obj))
    );
  };
  const quantityservOnChange = (productId, e) => {
    replaceQtById(productId, e.target.value);
  };

  const handleChapterChange = async (e) => {
    const newChapter = e.target.value;
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      console.log("reres", res.data);
      setUser(res.data.user);
      try {
        const resp = await axios.get(
          `http://localhost:3036/chapters/${newChapter}/branches`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setArticles(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
    setSelectedChapter(newChapter);
    console.log("Selected chapter:", newChapter);
  };

  const handleArticleChange = async (e) => {
    const newArticle = e.target.value;
    setSelectedArticle(newArticle);
    console.log("Selected article:", newArticle);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.get(
          `http://localhost:3036/inventory/branch/${newArticle}`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        if (resp.data.length != 0) {
          alert("this article has already its inventory");
          setSelectedArticle("");
          return;
        }
      } catch (error) {
        try {
          const resp = await axios.get(
            `http://localhost:3036/branches/${newArticle}/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          let init = resp.data.map((data) => {
            return {
              id: data.product_id,
              qt: data.quantity,
              observation: "",
              num_inv: "",
            };
          });
          setInitial(init);
          setProduits(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/inventory/${newArticle}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setProducts(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
  };
  //--------------------------------
  //  const [Observations, setObservations] = useState(inventaire.products.map(product => product.Observations));

  const ObservationsOnChange = (id, e) => {
    const replaceObservation = (id, newObs) => {
      setInitial((prevArray) =>
        prevArray.map((obj) =>
          obj.id === id ? { ...obj, observation: newObs } : obj
        )
      );
    };

    replaceObservation(id, e.target.value);
  };

  const numInvOnChange = (id, e) => {
    const replaceObservation = (id, newObs) => {
      setInitial((prevArray) =>
        prevArray.map((obj) =>
          obj.id === id ? { ...obj, num_inv: newObs } : obj
        )
      );
    };

    replaceObservation(id, e.target.value);
  };
  const getProduct = (id) => {
    const pro = produits.find((pro) => pro.product_id == id);
    if (pro) {
      return pro;
    } else {
      return {};
    }
  };
  const Save = (id, value) => {
    const numericValue = parseFloat(value);

    if (value !== undefined && value !== null && value !== "") {
      // Vérifier si la quantité est strictement positive
      if (numericValue >= 0 && !isNaN(numericValue)) {
        // Afficher une boîte de dialogue de confirmation
        const confirmSave = window.confirm(
          "Êtes-vous sûr de vouloir enregistrer les modifications?"
        );

        // Vérifier si l'utilisateur a confirmé l'enregistrement
        if (confirmSave) {
          let equal =
            parseInt(produits.find((pro) => pro.product_id === id).quantity) ===
            parseInt(initial.find((pro) => pro.id === id).qt);
          if (
            !equal &&
            initial.find((pro) => pro.id == id).observation.trim().length == 0
          ) {
            alert("observation is mandatory");
            return;
          }
          data.push({
            product_id: id,
            observation: initial.find((pro) => pro.id == id).observation,
            qt_physique: initial.find((pro) => pro.id == id).qt,
            num_inv: initial.find((pro) => pro.id == id).num_inv,
          });
          setProducts((prev) => prev.filter((pro) => pro.product_id != id));

          console.log(data);
        }
      }
    }
  };

  const handleSave = async (id, value, value3) => {
    // Vérifier si les valeurs sont présentes et correctes
    const confirmSave = window.confirm(
      "Êtes-vous sûr de vouloir enregistrer les modifications?"
    );
    // Vérifier si l'utilisateur a confirmé l'enregistrement
    if (confirmSave) {
      if (products.length == 0) {
        try {
          const res = await axios.get("http://localhost:3036/refresh", {
            withCredentials: true,
          });
          for (let product of data) {
            try {
              const resp = await axios.post(
                `http://localhost:3036/inventory/${selectedArticle}`,
                {
                  product_id: product.product_id,
                  observation: product.observation,
                  qt_physique: product.qt_physique,
                  num_inv: product.num_inv,
                },
                {
                  headers: {
                    Authorization: `Bearer ${res.data.accessToken}`,
                  },
                  withCredentials: true,
                }
              );
              console.log(resp.data);
            } catch (error) {
              console.log(error);
              alert("something went wrong !");
              return;
            }
          }
        } catch (error) {
          // If an error occurs, redirect to the login page
          navigate("/login");
          console.log(error);
        }
      } else {
        alert("Complete the inventory !");
        return;
      }
      setData([]);
      // retirer de la list
    } else {
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
            overflow: "100% auto",
            width: "100%",
            marginTop: "8vh",
            marginLeft: " 60px",
            height: "92vh",
            padding: "60px",
          }}
        >
          <div
            style={{
              display: "flex ",
              width: "95%",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "100px",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex ", gap: "20px" }}>
              <div
                style={{
                  color: "#5B548E",
                  marginLeft: "10px",
                  marginRight: "60px",
                  fontSize: "26px",
                }}
              >
                {" "}
                Create Inventory{" "}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {selectedArticle && products.length == 0 && (
                <Link
                  to={`/view-inventory/${selectedArticle}`}
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
                    backgroundColor: "green",
                    color: "white",
                  }}
                >
                  View inventory{" "}
                  <MdNavigateNext style={{ marginLeft: "5px" }} />
                </Link>
              )}
              <Link
                to={`/list-inventory`}
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
                View inventory List{" "}
                <MdNavigateNext style={{ marginLeft: "5px" }} />
              </Link>
            </div>
          </div>

          <div
            style={{
              height: " 100px ",
              display: "flex",
              borderRadius: "20px",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginBottom: "30px",
              gap: "calcl(height/3-40px)",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "15px",
                  color: "#5B548E",
                  marginLeft: "50px",
                }}
              >
                {" "}
                Chapitre:{" "}
              </div>
              <select
                value={selectedChapter}
                onChange={handleChapterChange}
                style={{
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  width: " 260px",
                  fontSize: "15px",
                  height: "40px",
                  marginBottom: "30px",
                  border: "none",
                  color: "rgba(58,53,65,0.87)",
                }}
              >
                <option value="">Choisissez un chapitre</option>
                {chapters.map((chapter, index) => (
                  <option key={index} value={chapter.chapter_id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div
                style={{
                  fontSize: "15px",
                  color: "#5B548E",
                  marginLeft: "50px",
                }}
              >
                {" "}
                Article:{" "}
              </div>

              <select
                value={selectedArticle}
                onChange={handleArticleChange}
                style={{
                  color: "rgba(58,53,65,0.87)",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  width: " 260px",
                  fontSize: "15px",
                  height: "40px",
                  marginBottom: "30px",
                  border: "none",
                }}
              >
                <option value="">Choisissez un article</option>
                {selectedChapter &&
                  articles.map((article, index) => (
                    <option key={index} value={article.branch_id}>
                      {article.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "20px",
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
            {/* ------------------------ */}
            <div
              style={{
                width: "100%",
                marginBottom: "10px",
                display: "flex",
                gap: "15px",
                alignItems: "center",
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
                    marginTop: "20px",
                  }}
                >
                  {" "}
                  Product:{" "}
                </div>
              </div>
              <div
                style={{
                  width: "5%",
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
                  }}
                >
                  Reste {thisYear - 1}:
                </div>
              </div>
              <div
                style={{
                  width: "5%",
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
                  }}
                >
                  {" "}
                  Entrée {thisYear}:{" "}
                </div>
              </div>
              <div
                style={{
                  width: "5%",
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
                  }}
                >
                  {" "}
                  Sortie {thisYear}:{" "}
                </div>
              </div>
              <div
                style={{
                  width: "6%",
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
                  }}
                >
                  {" "}
                  Numero d'inventaire:{" "}
                </div>
              </div>
              <div
                style={{
                  width: "6%",
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
                  }}
                >
                  {" "}
                  Quantité:{" "}
                </div>
              </div>
              <div
                style={{
                  width: "6%",
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
                  }}
                >
                  {" "}
                  Qt.Physique:{" "}
                </div>
              </div>
              <div
                style={{
                  width: "13%",
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
                  }}
                >
                  {" "}
                  Observations:{" "}
                </div>
              </div>
            </div>

            {/* ------------------------ */}

            {/* La liste des composants de produit */}
            {products.map((cmdData, index) => (
              <div
                key={cmdData.product_id}
                style={{
                  width: "100%",
                  height: "55px",
                  marginBottom: "10px",
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
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
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      margin: "0px",
                    }}
                  >
                    <input
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
                        textAlign: "center",
                      }}
                      value={getProduct(cmdData.product_id)?.name}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "5%",
                    display: "flex",
                    flexDirection: "column",
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
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    {cmdData.rest}{" "}
                  </div>
                </div>
                <div
                  style={{
                    width: "5%",
                    display: "flex",
                    flexDirection: "column",
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
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {cmdData.entryTotal}{" "}
                  </div>
                </div>
                <div
                  style={{
                    width: "5%",
                    display: "flex",
                    flexDirection: "column",
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
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {cmdData.exitTotal}{" "}
                  </div>
                </div>

                <div
                  style={{
                    width: "6%",
                    display: "flex",
                    flexDirection: "column",
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
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        margin: "0px",
                      }}
                    >
                      <input
                        type="text"
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
                          textAlign: "center",
                        }}
                        placeholder="Num_inventaire"
                        value={
                          initial.find((pro) => pro.id == cmdData.product_id)
                            .num_inv
                        }
                        onChange={(e) => numInvOnChange(cmdData.product_id, e)}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "6%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></div>
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
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {cmdData.logicalQuantity}{" "}
                  </div>
                </div>
                <div
                  style={{
                    width: "6%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <input
                    type="number"
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
                      textAlign: "center",
                    }}
                    placeholder="Qt.Physique"
                    value={
                      initial.find((pro) => pro.id == cmdData.product_id).qt
                    }
                    onChange={(e) =>
                      quantityservOnChange(cmdData.product_id, e)
                    }
                  />
                </div>

                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <input
                    style={{
                      color: "#666666",
                      borderRadius: "20px",
                      height: "45px", // Hauteur fixe, ajustez selon vos besoins
                      overflowY: "auto", // Utilisation de 'auto' pour activer le défilement vertical si nécessaire

                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      textAlign: "center",
                    }}
                    placeholder="Observation "
                    value={
                      initial.find((pro) => pro.id == cmdData.product_id)
                        .observation
                    }
                    onChange={(e) =>
                      ObservationsOnChange(cmdData.product_id, e)
                    }
                  />
                </div>
                <button
                  style={{
                    borderRadius: "20px",
                    height: "45px",
                    width: "100px",
                    paddingRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    backgroundColor: "#17BF6B",
                    justifyContent: "center",
                    color: "white",
                    border: "none",
                    marginTop: "0px",
                    textAlign: "center",
                  }}
                  onClick={() =>
                    Save(
                      cmdData.product_id,
                      initial.find((pro) => pro.id == cmdData.product_id).qt,
                      initial.find((pro) => pro.id == cmdData.product_id)
                        .observation
                    )
                  }
                >
                  save
                </button>
              </div>
            ))}
          </div>
          {selectedArticle && products.length == 0 && data.length != 0 && (
            <button
              onClick={handleSave}
              style={{
                borderRadius: "20px",
                height: "45px",
                width: "200px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                backgroundColor: "#100B39",
                color: "white",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "40px",
              }}
            >
              save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditInventaire;
