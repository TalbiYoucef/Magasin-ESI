import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GrNext } from "react-icons/gr";
import axios from "axios";

const DemandeFourniture = () => {
  //utilisateur
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState({});
  const [demander, setDemander] = useState("");
  const [products, setProducts] = useState([]);
  const [accorded,setAccorded] = useState([]);
  const [validated,setvalidated] = useState([])
  const [service, setService] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/services/${res.data.user.service_id}/`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setService(resp.data.name);
        } catch (error) {
          console.log(error);
        }

        try {
          const respo = await axios.get(`http://localhost:3036/commands/${id}`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });

          try {
            const resp = await axios.get(`http://localhost:3036/users/${respo.data.user_id}`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            });
            setDemander(`${resp.data.firstname} ${resp.data.lastname}`)
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }


        try {
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/products/initialized`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setProducts(resp.data);
          setDate(String(resp.data[0].updatedAt).split("T")[0]);
          
        } catch (error) {
          console.log(error);
        }

        try {
          
          const respV = await axios.get(
            `http://localhost:3036/commands/${id}/products/accepted`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(respV.data)

          const extractedQuantities = respV.data.map((product) => {
            return { id: product.product_id, qt: product.quantity };
          });
          setvalidated(extractedQuantities)
        } catch (error) {
          console.log(error)
        }

        try {
          const respA = await axios.get(
            `http://localhost:3036/commands/${id}/products/validated`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(respA.data)
          const extractedQuantitiesA = respA.data.map((product) => {
            return { id: product.product_id, qt: product.quantity };
          });
          console.log(extractedQuantitiesA)
          setAccorded(extractedQuantitiesA)
        } catch (error) {
          console.log(error)
        }
        try {
          const resp = await axios.get(`http://localhost:3036/products`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setAllProducts(resp.data);
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
    const name = allProducts.find((pro) => pro.product_id == id);
    if (name) {
      return name.name;
    } else {
      return "";
    }
  };
  const userData = [
    {
      id: 1,
      roleuser: "magasinier",
    },
  ];
  const styles = {
    section: {
      display: "flex",
      height: "92vh",
      flexDirection: "column",
    },
    bnfrnt: {
      marginLeft: "8%",
      textDecoration: "none",
      justifyContent: "space-between",
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "8%",
    },
    buttonsRightFr: {
      display: "flex",
      flexDirection: "column",
      alignContent: "flex-end",
      justifyContent: "center",
    },
    fournitureList: {
      display: "flex",
      justifyContent: " space-between",
      width: "220px",
      backgroundColor: "#100B39",
      borderRadius: "30px",
      marginRight: "80px",
      marginBottom: "5px",
      padding: "10px 25px",
      fontSize: "16px",
      border: "none",
      color: "#fff",
      cursor: "pointer",
    },
    createsortie: {
      backgroundColor: "#17BF6B",
      width: "220px",
      borderRadius: "30px",
      marginRight: "80px",
      marginBottom: "5px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      color: "#fff" /* Change the text color */,
      cursor: "pointer",
    },
    viewSortie: {
      backgroundColor: "#0047FF",
      width: "220px",
      borderRadius: "30px",
      marginRight: "80px",
      marginBottom: "5px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      color: "#fff" /* Change the text color */,
      cursor: "pointer",
    },
    framee: {
      fontSize: "16px",
      border: "1px solid #ccc",
      padding: "20px",
      margin: "auto",
      height: "max-content",
      width: "max-content",
      marginBottom: "0px",
      marginTop: "0px",
      display: "flex",
    },
    bonfrnt: {
      marginTop: "5px",
      marginLeft: " 8%",
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
      marginLeft: "4%",
    },
    demandeFourniture: {
      textDecoration: "underline",
      display: "flex",
      alignContent: "center",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
    },
    infoDirection: {
      marginBottom: "10px",
      marginLeft: "5%",
      marginRight: "20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    demandeur: {
      marginLeft: "8%",
    },
    tabledeDemande: {
      marginTop: "10px",
      marginLeft: "40px",
      marginRight: "20px",
      fontSize: "x-small",
      width: "90%",
      borderCollapse: "collapse",
      border: "1px solid #000",
      tableLayout: "fixed",
    },
    headDesignation: {
      width: "60%",
    },
    head: {
      fontSize: "small",
      textAlign: "center",
      border: "1px solid #000",
      height: "20px",
    },
    infoprodDemender: {
      fontSize: "small",
      height: "20px",
      border: "1px solid #000",
      textAlign: "center",
    },
    infoNom: {
      textAlign: "left",
      paddingLeft: "2px",
      width: "60%",
    },
    benificier: {
      marginLeft: "10%",
      fontWeight: "bold",
      float: "left",
      marginTop: "40px",
      textDecoration: "underline",
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
    deletedf: {
      backgroundColor: "red",
      color: "white",
      marginLeft: "10px",
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
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      // Delete the page from local storage
      localStorage.removeItem("fournitureinfos");
      // Navigate back to the previous page
      navigate(-1); // Use navigate function to go back
    }
  };
  const handleDownload = async () => {
    // Wait for the content to render
    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the delay as needed

    // Capture the entire content area
    html2canvas(frameRef.current, { scrollY: -window.scrollY }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Adjust height to maintain aspect ratio
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("bon_de_fourniture.pdf");
      }
    );
  };
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
            <div style={styles.bnfrnt}>
              <h3 className="bonfrnt">DEMANDE DE FOURNITURE</h3>
              <div style={styles.buttonsRightFr}>
                <Link to="/MyOrders" style={{ textDecoration: "none" }}>
                  <button
                    style={styles.fournitureList}
                    onClick={() => navigate(-2)}
                  >
                    Fourniture List <GrNext />
                  </button>
                </Link>
                {userData[0].roleuser === "magasinier" && (
                  <Link
                    to={`/cmdi/${id}/create-bon-sortie`}
                    className="create-bnsortie-link"
                  >
                    <button
                      style={styles.createsortie}
                      onClick={() => console.log("Create sortie clicked")}
                    >
                      + Create Bon De Sortie
                    </button>
                  </Link>
                )}
                <Link
                  to={`/view-bon-sortie/${id}`}
                  className="viewbnsortie-link"
                >
                  <button
                    style={styles.viewSortie}
                    onClick={() => console.log("View bn de sortie clicked")}
                  >
                    View Bon De Sortie
                  </button>
                </Link>
              </div>
            </div>
            <div style={styles.framee}>
              <div
                style={{ ...styles.contframee, maxWidth: "800px" }}
                ref={frameRef}
              >
                <div>
                  <img style={styles.logoesiImg} src={logoesi} alt="My Image" />
                </div>
                <div style={styles.infoDirection}>
                  <h4>
                    Direction <br /> Secretariat general{" "}
                  </h4>
                  <h4> Sidi Bel Abbes le: {date} </h4>
                </div>
                <div style={styles.demandeFourniture}>
                  <h3>
                    <i style={{ textDecoration: "underline" }}>
                      DEMANDE DE FOURNITURE
                    </i>
                  </h3>
                </div>
                <div style={styles.demandeur}>
                  {" "}
                  <h4>
                    <i style={{ textDecoration: "underline" }}>
                      {" "}
                      Le Demandeur:{" "}
                    </i>
                    {demander}{" "}
                  </h4>{" "}
                </div>
                <table style={styles.tabledeDemande}>
                  <thead>
                    <tr>
                      <th style={styles.head}>N°</th>
                      <th style={{ ...styles.head, ...styles.headDesignation }}>
                        Désignation
                      </th>
                      <th style={styles.head}>Quantité demandee</th>
                      <th style={styles.head}>Quantité accordee</th>
                      <th style={styles.head}>Quantité validee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td style={styles.infoprodDemender}>{index + 1}</td>
                        <td
                          style={{
                            ...styles.infoprodDemender,
                            ...styles.infoNom,
                          }}
                        >
                          {getProductName(product.product_id)}
                        </td>
                        <td style={styles.infoprodDemender}>
                          {product.quantity}
                        </td>
                        <td style={styles.infoprodDemender}>{accorded.length != 0 ? accorded.find(pro => pro.id === product.product_id)?.qt : ''}</td>
                        <td style={styles.infoprodDemender}>{validated.length != 0 ? validated.find(pro => pro.id === product.product_id)?.qt : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h4 style={styles.benificier}>
                  <i>Le beneficiaire</i>
                </h4>
              </div>
            </div>
            <div style={styles.printCont}>
              {userData[0].roleuser === "consumer" && (
                <button
                  style={styles.editdf}
                  onClick={() => (window.location.href = "/edit-page")}
                >
                  Edit
                </button>
              )}{" "}
              <button style={styles.deletedf} onClick={handleDelete}>
                Delete
              </button>
              <button style={styles.printButton} onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DemandeFourniture;
