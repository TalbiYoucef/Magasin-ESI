import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./ProLine.jsx";
import Baarr from "./Bar.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Articles() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
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
                  Article name{" "}
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
                ></div>
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
    </div>
  );
}

export default Articles;
