import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import axios from "axios";

const FicheInventaire = () => {
  const { id } = useParams();
  console.log(id);
  const savePdf = () => {
    console.log("saved");
  };
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState("");
  const [allProducts, setallProducts] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [article, setArticle] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/branches/${id}/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setallProducts(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/inventory/${id}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setData(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(`http://localhost:3036/branches/${id}`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setArticle(resp.data);
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/inventory/branch/${id}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setProducts(resp.data);
          setDate(String(resp.data[0].createdAt).split("T")[0]);
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
  const styles = {
    section: {
      display: "flex",
      height: "92vh",
      flexDirection: "column",
    },
    framee: {
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "30px",
      padding: "10px",
      margin: "auto",
      height: "max-content",
      width: "max-content",
      marginBottom: "0px",
      marginTop: "0px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },

    contframee: {
      padding: "5px",
      display: "flex",
      fontFamily: "Arial, sans-serif",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      flexWrap: "wrap",
    },
    logoesiImg: {
      width: "95%",
      height: "100px",
      marginLeft: "2%",
    },
    ficheinventaire: {
      display: "flex",
      alignContent: "center",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
    },
    infoDirection: {
      marginLeft: "3%",
      marginRight: "20px",
      display: "flex",
      fontSize: "14px",
      paddingBottom: "5px",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tableinventaire: {
      marginTop: "10px",
      marginLeft: "3%",
      marginRight: "20px",
      fontSize: "x-small",
      width: "96%",
      borderCollapse: "collapse",
      border: "1px solid #000",
      tableLayout: "auto",
      paddingBottom: "0px",
    },

    head: {
      fontSize: "small",
      textAlign: "center",
      border: "1px solid #000",
      height: "20px",
      padding: "5px",
    },
    infoprodinventaire: {
      fontSize: "small",
      height: "20px",
      border: "1px solid #000",
      textAlign: "center",
      padding: "5px",
    },
    infoNom: {
      textAlign: "left",
      paddingLeft: "2px",
    },
    printButton: {
      backgroundColor: "#0047FF",
      color: "white",
      width: "130px",
      height: "40px",
      borderRadius: "30px",
      borderColor: "transparent",
      padding: "10px 20px",
      marginLeft: "10px",
    },
    printCont: {
      marginTop: "20px",
      transition: "border-color 0.3s ease",
      fontSize: "16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    editdf: {
      backgroundColor: "orange",
      color: "white",
      width: "130px",
      height: "40px",
      borderRadius: "30px",
      borderColor: "transparent",
      borderRadius: "30px",
      borderColor: "transparent",
      padding: "10px 20px",
    },
  };
  const frameRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const downloadPDF = () => {
    const capture = frameRef.current;
    setLoader(true);
    setTimeout(() => {
      html2canvas(capture).then((canvas) => {
        console.log(canvas); // log the canvas to see if it's generated
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        console.log(doc); // log the created PDF to ensure it's correct
        setLoader(false);
        doc.save("fourniture.pdf");
      });
    }, 100); // ajust the delay as needed
  };
  // Fonction pour obtenir l'année actuelle

  return (
    <>
      <div>
        <section>
          <nav>
            <Nav username={user.username} />
          </nav>
          <div>
            <div>
              <Side />
            </div>
            <div
              style={{
                ...styles.framee,
                marginTop: "90px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                style={{
                  ...styles.contframee,
                  maxWidth: "1000px",
                  height: "auto",
                  paddingBottom: "10px",
                }}
                ref={frameRef}
              >
                <div>
                  <img style={styles.logoesiImg} src={logoesi} alt="My Image" />
                </div>
                <div style={styles.infoDirection}>
                  <span>
                    Secretariat general <br />
                    sous-direction des finances, comptabilité et des moyens
                    <br /> Service des moyens, de l'inventaire et des archives
                  </span>
                </div>
                <div style={styles.ficheinventaire}>
                  <h3> Inventaire arreté au : {date} </h3>
                </div>
                <div style={styles.infoDirection}>
                  <span>Article :{article.name}</span>
                </div>
                <table style={styles.tableinventaire}>
                  <thead>
                    <tr>
                      <th style={styles.head}>N°</th>
                      <th style={{ ...styles.head }}>Désignation</th>
                      <th style={{ ...styles.head }}>N° D'invention</th>
                      <th style={{ ...styles.head }}>Reste{thisYear - 1}</th>
                      <th style={{ ...styles.head }}>Entree {thisYear}</th>
                      <th style={{ ...styles.head }}>Sortie {thisYear}</th>
                      <th style={{ ...styles.head }}>Quantité Logique</th>
                      <th style={{ ...styles.head }}>Quantité Physique</th>
                      <th style={{ ...styles.head }}>Ecart</th>
                      <th style={{ ...styles.head }}>Observation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr key={index}>
                        <td style={styles.infoprodinventaire}>{index + 1}</td>
                        <td
                          style={{
                            ...styles.infoprodinventaire,
                            ...styles.infoNom,
                          }}
                        >
                          {allProducts.find(pro => pro.product_id == product.product_id)?.name}
                        </td>
                        <td style={{ ...styles.infoprodinventaire }}>
                          {product.num_inv}
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {product.rest}
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {product.entryTotal}
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {product.exitTotal}
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {product.logicalQuantity}
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {
                            products.find(
                              (pro) => pro.product_id === product.product_id
                            )?.qt_physique
                          }
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {product.logicalQuantity -
                            products.find(
                              (pro) => pro.product_id === product.product_id
                            )?.qt_physique}
                        </td>
                        <td style={styles.infoprodinventaire}>
                          {
                            products.find(
                              (pro) => pro.product_id === product.product_id
                            )?.observation
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  marginLeft: "3%",
                  paddingBottom: "10px",
                  marginRight: "2%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <b>Le Magasinier</b>
                </p>
                <p>
                  <b>Le Directeur</b>
                </p>
              </div>
            </div>
            <div style={styles.printCont}>
              <button
                style={styles.printButton}
                onClick={downloadPDF}
                disabled={!(loader === false)}
              >
                {loader ? <span>Downloading</span> : <span>Download</span>}
              </button>
              <button
                style={{ ...styles.printButton, backgroundColor: "green" }}
                onClick={savePdf}
              >
                save
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FicheInventaire;
