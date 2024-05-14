import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./PerLine.jsx";
import Baarr from "./Bar.jsx";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import CreateRoleForm from "./createChap.jsx";

function ViewChapter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [chapitres, setChapitres] = useState([]);

  const [user, setUser] = useState({});
  const toggleCreateChapitreForm = () => {
    setShowCreateChapitreForm(!showCreateChapitreForm);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateChapitre = async (newChapitre) => {
    console.log(
      newChapitre
    )
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        await axios.post(
          "http://localhost:3036/chapters",
          {
            name: newChapitre.chapitre,
          },
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        alert("Chapter created successfully");
      } catch (error) {
        console.log(error);
        alert("failed to create chapter");
      }
    } catch (error) {
      navigate("/login");
    }
    setShowCreateChapitreForm(false)
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
  }, [navigate,showCreateChapitreForm]);

  const [showArticlessModal, setShowArticlesModal] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const handleViewArticle = () => {
    ///window.location.href ('/viewArticle')
    window.confirm("Are you sure you want to Confirm the Role?");
  };
  const filteredRoles = chapters.filter((chapitre) =>
    chapitre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const ArticlesList = filteredRoles.map((article, index) => (
    <PerLine id={article.chapter_id} key={index} rolenam={article.name} /> // Passer la fonction handleViewRole comme prop
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
              ></div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginRight: "40px",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginRight: "40px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="Search">
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="search Chapitre"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  style={{ border: "none", height: "30px", width: "120px" }}
                />
              </div>
              <div className="create-list">
                <Link
                  onClick={toggleCreateChapitreForm}
                  className="btn-create-usr"
                >
                  Create Chapitre
                </Link>
                <Link to="/articles" className="btn-create-usr1">
                  {" "}
                  Articles List <MdNavigateNext />
                </Link>
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
      {showCreateChapitreForm && (
        <div className="modal-overlay-create-role">
          <div className="modal-content-create-role">
            <CreateRoleForm
              onCreateChapitre={handleCreateChapitre}
              onClose={() => setShowCreateChapitreForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewChapter;
