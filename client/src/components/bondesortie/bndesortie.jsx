import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GrNext } from "react-icons/gr";
import axios from "axios";
const DemandeDeFourniture = () => {
  //utilisateur

  const navigate = useNavigate();
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [service, setService] = useState("");
  const [date,setDate]=useState('')
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
          const resp = await axios.get(
            `http://localhost:3036/commands/${id}/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setDate(String((resp.data)[0].createdAt).split('T')[0])
          setProducts(resp.data);
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
  const getProductName =(id)=>{
    const name = allProducts.find(pro => pro.product_id == id)
    if(name){
      return name.name
    }else{
      return ''
    }

  }
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
    bnsort: {
      marginLeft: "8%",
      textDecoration: "none",
      justifyContent: "space-between",
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "8%",
    },
    buttonsRightsortie: {
      display: "flex",
      flexDirection: "column",
      alignContent: "flex-end",
      justifyContent: "center",
    },
    fourntList: {
      display: "flex",
      justifyContent: " space-between",
      width: "240px",
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
    infoframe: {
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
    bsort: {
      marginTop: "5px",
      marginLeft: " 8%",
    },
    continfoframe: {
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
    bondecharge: {
      textDecoration: "underline",
      display: "flex",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    service: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "5%",
      marginLeft: "5%",
      marginRight: "8%",
    },
    tablesortie: {
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
      width: "25%",
    },
    head: {
      fontSize: "small",
      textAlign: "center",
      border: "1px solid #000",
      height: "20px",
    },
    infdesortie: {
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
    signature: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: "10%",
      marginRight: "10%",
      marginBottom: "20%",
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
      fontWeight: "500",
      fontSize: "16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "row",
    },
    createsortie: {
      backgroundColor: "#17BF6B",
      width: "240px",
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
      width: "240px",
      borderRadius: "30px",
      marginRight: "80px",
      marginBottom: "5px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      color: "#fff" /* Change the text color */,
      cursor: "pointer",
    },
    editbs: {
      backgroundColor: "orange",
      color: "white",
      width: "130px",
      height: "40px",
      borderRadius: "30px",
      borderColor: "transparent",
      padding: "10px 20px",
    },
    deletebs: {
      backgroundColor: "red",
      color: "white",
      marginLeft: "10px",
      width: "130px",
      height: "40px",
      borderRadius: "30px",
      borderColor: "transparent",
      padding: "10px 20px",
    },
  };

  const sortieData = [
    {
      id: "0",
      numSortie: "1",
      demandeur: "prof",
      service: "service",
      date: "23/04/2024",
      products: [
        {
          idp: 9,
          nommP: "Produit 1",
          quantiteDemandee: 2,
          quantiteServie: 2,
          numInventaire: 1,
          observation: "observation produit",
        },
        {
          idp: 1,
          nommP: "Produit 1",
          quantiteDemandee: 5,
          quantiteServie: 2,
          numInventaire: 11,
          observation: "observation produit",
        },
        {
          idp: 2,
          nommP: "Produit 2",
          quantiteDemandee: 1,
          quantiteServie: 1,
          numInventaire: 4,
          observation: "observation produit",
        },
        {
          idp: 3,
          nommP: "Produit 1",
          quantiteDemandee: 10,
          quantiteServie: 10,
          numInventaire: 8,
          observation: "observation produit",
        },
        {
          idp: 4,
          nommP: "Produit 2",
          quantiteDemandee: 7,
          quantiteServie: 4,
          numInventaire: 19,
          observation: "observation produit",
        },
        {
          idp: 5,
          nommP: "Produit 3",
          quantiteDemandee: 2,
          quantiteServie: 2,
          numInventaire: 13,
          observation: "observation produit",
        },
      ],
    },
  ];
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
            {" "}
            <Nav />{" "}
          </nav>
          <div>
            <div>
              <Side />
            </div>
            <div style={styles.bnsort}>
              <h3 className="bsort">
                BON DE SORTIE 
              </h3>
              <div style={styles.buttonsRightsortie}>
                <Link to="/mes-cmnd" style={{ textDecoration: "none" }}>
                  <button
                    style={styles.fourntList}
                    onClick={() => navigate(-2)}
                  >
                    <span>Fourniture List</span> <GrNext />
                  </button>
                </Link>
                {userData[0].roleuser === "magasinier" && (
                  <Link to="/another-page" className="create-bnsortie-link">
                    <button
                      style={styles.createsortie}
                      onClick={() => console.log("Create sortie clicked")}
                    >
                      + Create Bon De Sortie
                    </button>
                  </Link>
                )}
                <Link to="/bondedecharge" className="viewbnsortie-link">
                  <button
                    style={styles.viewSortie}
                    onClick={() => console.log("View bn de sortie clicked")}
                  >
                    View Bon De Decharge
                  </button>
                </Link>
              </div>
            </div>
            <div style={styles.infoframe}>
              <div
                style={{ ...styles.continfoframe, maxWidth: "800px" }}
                ref={frameRef}
              >
                <div>
                  <img style={styles.logoesiImg} src={logoesi} alt="My Image" />
                </div>

                <div style={styles.bondecharge}>
                  <h2 style={{ textDecoration: "underline" }}>BON DE SORTIE</h2>
                  <strong style={{ textDecoration: "underline" }}>
                    MAGASIN CENTRAL
                  </strong>
                </div>
                <div style={styles.service}>
                  {" "}
                  <span>Service: {service}</span>
                  <span> Le: {date}</span>{" "}
                </div>

                <table style={styles.tablesortie}>
                  <thead>
                    <tr>
                      <th style={styles.head}>N°</th>
                      <th style={{ ...styles.head, ...styles.headDesignation }}>
                        Désignation des Articles
                      </th>
                      <th style={styles.head}>Quantité demandee</th>
                      <th style={styles.head}>Quantité servie</th>
                      <th style={styles.head}>N° inventaire</th>
                      <th style={{ ...styles.head, ...styles.headDesignation }}>
                        Observation{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td style={styles.infdesortie}>{index + 1}</td>
                        <td
                          style={{ ...styles.infdesortie, ...styles.infoNom }}
                        >
                          {getProductName(product.product_id)}
                        </td>
                        <td style={styles.infdesortie}>
                          {product.quantity}
                        </td>
                        <td style={styles.infdesortie}>
                          {product.delivered_amount}
                        </td>
                        <td style={styles.infdesortie}>
                          {product.num_inventaire}
                        </td>
                        <td style={styles.infdesortie}>
                          {''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h4>
                  <div style={styles.signature}>
                    {" "}
                    <span> Le Magasinier</span> <span> Le Responsable</span>{" "}
                  </div>
                </h4>
              </div>
            </div>
            <div style={styles.printCont}>
              {userData[0].roleuser === "magasinier" && (
                <button
                  style={styles.editbs}
                  onClick={() => (window.location.href = "/edit-page")}
                >
                  Edit
                </button>
              )}
              {userData[0].roleuser === "magasinier" && (
                <button style={styles.deletebs} onClick={handleDelete}>
                  Delete
                </button>
              )}{" "}
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

export default DemandeDeFourniture;
