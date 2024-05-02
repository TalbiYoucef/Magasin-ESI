import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./viewBR.css";
import Nav from "../nav/nav";
import Side from "../side/side";
import logoesi from "../../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const BonDeReception = () => {
  const { idcmd, id } = useParams();
  console.log(idcmd, id);
  const [date, setDate] = useState("");
  const [order, setOrder] = useState({});
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
            `http://localhost:3036/commands/${idcmd}/purchasing-order`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setOrder(resp.data.order);
          setDate(String(resp.data.order.updatedAt).split("T")[0]);
          console.log(resp.data.order);
          try {
            const article = await axios.get(
              `http://localhost:3036/commands/${idcmd}/`,
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
              `http://localhost:3036/commands/${idcmd}/products`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );

            console.log(article.data);
            setProducts(article.data);
          } catch (error) {
            console.log(error);
          }

          try {
            const article = await axios.get(
              `http://localhost:3036/branches/${resp.data.order.branch_id}/`,
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
              `http://localhost:3036/suppliers/${resp.data.order.supplier_id}/`,
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
          navigate("/commands");
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
      return product.name;
    }
    return "";
  };

  const cmdData = [
    {
      id: "0",
      numCmd: "1",
      chapitre: "Chapitre1",
      article: "Article1",
      supplier: "Sarl PC STORE",
      date: "04-03-2024",
      state: "initialized",
      products: [
        { idp: 0, nommP: "Produit 1", quantite: 2 },
        { idp: 1, nommP: "Produit 2", quantite: 1 },
        { idp: 2, nommP: "Produit 3", quantite: 2 },
      ],
    },
  ];

  const brData = [
    {
      id: "2",
      date: "09-03-2024",
      cmdid: "1",
      commnt: "",
      type: "",
    },
  ];
  const frameRef = useRef(null);

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
        pdf.save("bon_de_reception.pdf");
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
          <div style={{ marginTop: "80px" }}>
            <div>
              <Side />
            </div>
            <div className="bnrcpt">
              <h4 className="BR">BON DE RECEPTION N° : {brData[0].id}</h4>
              <div className="buttons-right-rs">
                <Link to="/commands-list">
                  <button className="commands-ls" onClick={() => navigate(-2)}>
                    Commands List
                  </button>
                </Link>
                <Link to={"/bondecommand"} className="view-cmd-link">
                  <button
                    className="view-cmd"
                    onClick={() => console.log("View cmd clicked")}
                  >
                    View Command
                  </button>
                </Link>
              </div>
            </div>
            <div className="frame1" ref={frameRef}>
              <div className="cont-frame" style={{ maxWidth: "800px",border:'none' }}>
                <div>
                  <img className="logoesi-img" src={logoesi} alt="My Image" />
                </div>
                <div className="bon-reception">
                  <h4>BON DE RECEPTION</h4>
                  <div className="info-br">
                    <p>N° :{id}</p>&nbsp;&nbsp;
                    <p>Date :{date}</p>
                  </div>
                </div>
                <div className="info1">
                  <p>Fournisseur: {supplier.name}</p>
                  <div className="info-br2">
                    <p>N° du Bon de commande : {idcmd} </p>{" "} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p>
                      Date du Bon de Commande :
                      {String(products[0]?.updatedAt).split("T")[0] }
                    </p>
                  </div>
                </div>
                <table className="table1">
                  <thead>
                    <tr>
                      <th className="head">N°</th>
                      <th className="head head-designation">Désignation</th>
                      <th className="head">Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td className="info-product">{product.product_id}</td>
                        <td className="info-product info-designation">
                          {getproduct(product.product_id)}
                        </td>
                        <td className="info-product">{product.delivered_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="magasinier">Le Magasinier</p>
              </div>
            </div>
            <div className="print-cont">
              <button className="print-button" onClick={handleDownload}>
                Download PDF
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BonDeReception;
