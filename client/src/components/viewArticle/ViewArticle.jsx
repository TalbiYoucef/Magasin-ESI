import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./ProLine.jsx";
import Baarr from "./Bar.jsx";
import ProductsModal from "./ProductsModal.jsx";
import ProductsData from "../data/Produits.jsx";
import ViewProductModal from "../ViewProduct/ViewProductModal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewArticles() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [Article, setArticle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          const resp = await axios.get("http://localhost:3036/branches", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setArticle(resp.data);
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

  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(Article.Products);

  const handleViewProduct = () => {
    setShowProductModal(true);
  };

  const ProductsList = Article.map((element, index) => (
    <PerLine
      key={index}
      id={element.branch_id}
      rolenam={element.name}
    />
  ));

  const handleAddProducts = (Products) => {
    setSelectedProducts(Products);
    setShowProductsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };

  const handleConfirm = () => {
    const confirm = window.confirm(
      "Are you sure you want to Confirm the Article ?"
    );
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
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginRight: "40px",
                }}
              >
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
                    backgroundColor: "#0047FF",
                    boxShadow: "none",
                    border: "none",
                    color: "white",
                  }}
                  type="button"
                  onClick={() => setShowProductsModal(true)}
                >
                  Add Article
                </button>
                {/* {showProductsModal && (
                  <ProductsModal
                    Products={ProductsData}
                    selectedProducts={selectedProducts}
                    onClose={() => setShowProductsModal(false)}
                    onAddProducts={handleAddProducts}
                  />
                )} */}
                {/* {showProductModal && (
                  <ViewProductModal
                    onClose={() => setShowProductModal(false)}
                  />
                )} */}
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
    </div>
  );
}

export default ViewArticles;
