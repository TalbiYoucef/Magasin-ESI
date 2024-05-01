import React, { useEffect, useState } from "react";
import "./manProduits.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { BsSearch } from "react-icons/bs"; //chapitre data
import article from "../data/Articles.jsx"; //Produit data
import Per from "./produitLig.jsx";
import Barr from "./barProduit.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArticlesModal from "./ArticlesModal.jsx";

function Produits() {
  const { id } = useParams();
  const [allProduit, setAllProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEditRoleForm, setShowEditRoleForm] = useState(false);
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
        setUser(res.data.user)
        try {
          const resp = await axios.get(
            `http://localhost:3036/branches/${id}/products`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setProduits(resp.data);
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
          setAllProduits(resp.data);
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
  const handleViewRole = (produitName) => {
    setShowProductModel(true);
    const articleInfo = article.find((article) => article.name === produitName);
    setSelectedRole(articleInfo); // Stocker les informations de l'article sélectionné
    setShowEditRoleForm(true); // Afficher le formulaire d'édition
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = produits.filter((article) =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //---------------------------------------------

  // Ajoutez ceci pour afficher les nouveaux articles créés

  const produitList = filteredRoles.map((produit, index) => (
    <Per
      key={index}
      name={produit.name}
      onView={() => handleViewRole(produit.name)}
    />
  ));
  const handleClose = () => {
    setShowCreateChapitreForm(false);
  };
  const handleCreateChapitre = async (newChapitre) => {
    const getProductsIds = allProduit
      .filter((pro) => newChapitre.includes(pro.name))
      .map((pro) => pro.product_id);
    console.log(newChapitre, getProductsIds);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      getProductsIds.map(async (element) => {
        console.log(element);
        try {
          const resp = await axios.post(
            `http://localhost:3036/products/${element}/branch`,
            {
              branch_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(resp.data);
          const updatedChapitres = [
            ...produits,
            allProduit.filter((pro) => newChapitre.includes(pro.name)),
          ];
          setProduits(updatedChapitres);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
    setShowCreateChapitreForm(false); // Masquer le formulaire de création de chapitre après création réussie
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
                  Add Produit
                </Link>
                <Link
                  className="btn-create-usr"
                  style={{
                    backgroundColor: "orange",
                  }}
                  to={"/produits"}
                >
                  Produits liste
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
            <ArticlesModal
              Articles={allProduit}
              selectedArticles={selectedProducts}
              onClose={handleClose}
              onAddArticles={handleCreateChapitre}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Produits;
