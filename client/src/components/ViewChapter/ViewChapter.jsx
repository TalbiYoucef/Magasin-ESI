import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./PerLine.jsx";
import Baarr from "./Bar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewChapter() {
  const navigate = useNavigate();
  const [chapters,setChapters]=useState([])
  const [user, setUser] = useState({});
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


  const [showArticlessModal, setShowArticlesModal] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const handleViewArticle = () => {
    ///window.location.href ('/viewArticle')
    window.confirm("Are you sure you want to Confirm the Role?");
  };

  const ArticlesList = chapters.map((article, index) => (
    <PerLine
     id={article.chapter_id}
      key={index}
      rolenam={article.name}
    /> // Passer la fonction handleViewRole comme prop
  ));

  const handleAddArticles = (Articles) => {
    setSelectedArticles(Articles);
    setShowArticlesModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
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
              </div>
            </div>
            <Baarr />
          </div>
          <div
            style={{
              paddingtop: "20px",
              marginTop: "24vh",
              width: "85%",
              marginLeft: "20px",
            }}
          >
            {ArticlesList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewChapter;
