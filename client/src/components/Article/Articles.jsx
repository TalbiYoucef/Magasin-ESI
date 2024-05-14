import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./ProLine.jsx";
import Baarr from "./Bar.jsx";
import axios from "axios";
import CreateRoleForm from "./createArt.jsx";
import { useNavigate, useParams, Link } from "react-router-dom";

function Articles() {
  const { id } = useParams();
  const [branchName, setBranchName] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  const handleCreateChapitre = async (newChapitre) => {
    console.log(newChapitre);
    const getProductsIds = products
      .filter((pro) => newChapitre.produits.includes(pro.name))
      .map((pro) => pro.product_id);
    console.log(getProductsIds);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });

      try {
        const resp = await axios.post(
          `http://localhost:3036/branches`,
          {
            name: newChapitre.article,
            VAT: newChapitre.vat,
            chapter_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        try {
          await axios.post(
            `http://localhost:3036/branches/${resp.data.branch.branch_id}/products`,
            [...getProductsIds],
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
        }
      } catch (error) {
        alert("Failed to create article");
        console.log(error, "error");
      }
    } catch (error) {
      navigate("/login");
    }
    setShowCreateChapitreForm(false); // Masquer le formulaire de création de chapitre après création réussie
  };

  const toggleCreateChapitreForm = () => {
    setShowCreateChapitreForm(!showCreateChapitreForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/chapters/${id}/branches`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setArticles(resp.data);
        } catch (error) {
          console.log(error, "smth wrong");
        }
        try {
          const resp = await axios.get(`http://localhost:3036/chapters/${id}`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setBranchName(resp.data.name);
        } catch (error) {
          console.log(error, "smth wrong");
        }
        try {
          const resp = await axios.get(`http://localhost:3036/branches`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setAllArticles(resp.data);
        } catch (error) {
          console.log(error, "error");
        }
        try {
          const resp = await axios.get(`http://localhost:3036/products`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setProducts(resp.data);
        } catch (error) {
          console.log(error, "error");
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, [navigate, showCreateChapitreForm]);

  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleViewProduct = () => {
    setShowProductModal(true);
  };

  const ProductsList = articles.map((element, index) => (
    <PerLine
      id={element.branch_id}
      key={index}
      rolenam={element.name}
      handleViewProduct={handleViewProduct}
    />
  ));

  const handleConfirm = () => {
    const confirm = window.confirm("Are you sure you want exit this page ?");
    navigate("/articles");
  };

  return (
    <div>
      <Nav username={user.username} />
      <div style={{ display: "flex", height: "92vh" }}>
        <Side link="roles" />
        <div
          style={{
            width: "85%",
            marginLeft: "10%",
            marginTop: " 8vh",
          }}
        >
          <div
            style={{
              position: "fixed",
              height: "22vh",
              backgroundColor: "white",
              width: "85%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: " space-between ",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    marginLeft: "60px",
                    color: "#616262",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  Branch name{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "280px",
                    height: "40px",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                    padding: "20px ",
                    color: "#616262",
                    marginLeft: "40px",
                  }}
                >
                  {branchName}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginRight: "40px",
                }}
              >
                <Link
                  onClick={toggleCreateChapitreForm}
                  className="btn-create-usr"
                >
                  Create Article
                </Link>
                <button
                  style={{
                    textDecoration: "none",
                    width: "140px",
                    height: "40px",
                    borderRadius: "30px",
                    marginTop: "30px",
                    transition: "border-color 0.3s ease",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "500", // medium
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    textAlign: "center",
                    backgroundColor: "#FA9E15",
                    boxShadow: "none",
                    border: "none",
                    color: "white",
                  }}
                  onClick={handleConfirm}
                >
                  {" "}
                  Articles List{" "}
                </button>
              </div>
            </div>
            <Baarr />
          </div>
          <div
            style={{
              paddingtop: "20px",
              marginTop: "30vh",
              width: "85%",
              marginLeft: "20px",
            }}
          >
            {ProductsList}
          </div>
        </div>
      </div>
      {showCreateChapitreForm && (
        <div className="modal-overlay-create-role">
          <div
            className="modal-content"
            style={{ height: "500px", width: "700px", marginTop: "200px" }}
          >
            <CreateRoleForm
              produit={products}
              onCreateChapitre={handleCreateChapitre}
              onClose={() => setShowCreateChapitreForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Articles;
