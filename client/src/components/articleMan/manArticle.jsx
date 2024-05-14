import React, { useEffect, useState } from "react";
import "./manArticle.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Barr from "./barar.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PerLine from "../viewArticle/ProLine.jsx";

function AllArticles() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
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
          const resp = await axios.get(`http://localhost:3036/branches`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setArticles(resp.data);
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
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = articles.filter((article) =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const rolesList = filteredRoles.map((element, index) => (
    <PerLine id={element.branch_id} key={index} rolenam={element.name} />
  ));

  

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnrole">
        <Side className="siddd" link="roles" />
        <div
          className="Sect2role"
          style={{
            marginLeft: "5%",
          }}
        >
          <div className="upchap">
            <div className="uprole1">
              <div className="Search">
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="search Article"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  style={{ border: "none", height: "30px", width: "120px" }}
                />
              </div>
              <div className="create-list">
                <Link to="/produits" className="btn-create-usr1">
                  Produits List <MdNavigateNext />
                </Link>
              </div>
            </div>
            <Barr />
          </div>
          <div className="downchap">{rolesList}</div>
        </div>
      </div>
    </div>
  );
}

export default AllArticles;
