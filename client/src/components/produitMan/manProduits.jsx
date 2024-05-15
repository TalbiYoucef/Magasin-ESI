import React, { useEffect, useState } from "react";
import "./manProduits.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { BsSearch } from "react-icons/bs";
import Per from "./produitLig.jsx";
import CreateRoleForm from "./createProduit.jsx";
import Barr from "./barProduit.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Produit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});
  const [produits, setProduits] = useState([]);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  const [showProductModel, setShowProductModel] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user);
        try {
          const resp = await axios.get("http://localhost:3036/products", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setProduits(resp.data);
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
  }, [produits]);

  const handleViewRole = (produitName, id) => {
    setShowProductModel(true);
    console.log(showProductModel);
    console.log(produitName, id);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = produits.filter((article) =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const produitList = filteredRoles.map((produit, index) => (
    <Per
      key={index}
      name={produit.name}
      onView={() => handleViewRole(produit.name, produit.product_id)}
    />
  ));

  const handleCreateChapitre = async (newChapitre) => {
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const resp = await axios.post("http://localhost:3036/products", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          console.log(resp)
        } catch (error) {
          console.log(error)
        }

    } catch (error) {
      navigate('/')
    }
    setShowCreateChapitreForm(false);
  };

  const toggleCreateChapitreForm = () => {
    setShowCreateChapitreForm(!showCreateChapitreForm);
  };

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnrole">
        <Side className="siddd" link="roles" />
        <div className="Sect2role">
          <div className="upchap">
            <div className="uprole1">
              <div className="Search">
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="search Produit"
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
                  Create Produit
                </Link>
              </div>
            </div>
            <Barr />
          </div>
          <div className="downchap">{produitList}</div>
        </div>
      </div>
      {showCreateChapitreForm && (
        <div className="modal-overlay-create-role">
          <div
            className="modal-content"
            style={{ height: "500px", width: "700px", marginTop: "200px" }}
          >
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

export default Produit;
