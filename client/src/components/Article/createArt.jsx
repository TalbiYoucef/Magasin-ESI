import React, { useState, useEffect } from "react";

import ProduitsModal from "./produitModal.jsx";

function CreateRoleForm({ onCreateChapitre, onClose, produit }) {
  // Déclarer chapitreName et setChapitreName
  const [articles, setArticles] = useState(produit);
  const [selectedProduits, setSelectedProduits] = useState([]);
  const [showArticlesModal, setShowArticlesModal] = useState(false);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  const [Chdata, setChdata] = useState({
    articles: "",
    produits: [],
    vat: 19
  });
  const [message, setMessage] = useState("");

  const handleAddProduits = (produits) => {
    setSelectedProduits(produits);
    console.log("Chdata ///produit", Chdata);
    console.log("create ///produit", produits);
    setShowArticlesModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };

  useEffect(() => {
    setChdata({ ...Chdata, produits: selectedProduits });
  }, [selectedProduits]);

  //-----------
  const handleCreateArticle = () => {
    setArticles({ ...articles, Chdata }); // Mettre à jour l'état local avec le nouveau rôle
    setShowCreateChapitreForm(false); // Masquer le formulaire de création de rôle après la création
    console.log("handleCreateArticle");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onCreateChapitre(Chdata);
    setMessage("Chapter created successfully");
    alert("Chapter created successfully");
    console.log("nouveau  article  data ", Chdata);
  };

  return (
    <form
      className="createRoleForm"
      style={styles.createRoleForm}
      onSubmit={handleSubmit}
    >
      <div className="title1" style={styles.title1}>
        Create Article
      </div>
      <div className="formGroupCreateRole" style={styles.formGroupCreateRole}>
        <div className="ch" style={styles.ch}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="articles" className="input" style={styles.input}>
              Article name:
            </label>
            <input
              id="articles"
              placeholder="enter Article name"
              name="articles"
              onChange={(e) =>
                setChdata({ ...Chdata, article: e.target.value })
              }
              style={styles.input1}
              required
            />{" "}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="articles" className="input" style={styles.input}>
              TVA:
            </label>
            <input
             type="number"
              id="vat"
              placeholder="enter TVA percentage"
              name="vat"
              onChange={(e) =>
                setChdata({ ...Chdata, vat: e.target.value })
              }
              style={styles.input1}
              required
            />{" "}
          </div>


          <label htmlFor="Permissions" className="input" style={styles.input}>
            Produits:
          </label>
          <button
            className="input1"
            style={styles.input1}
            type="button"
            onClick={() => setShowArticlesModal(true)}
          >
            Choose Produits
          </button>
        </div>

        {showArticlesModal && (
          <ProduitsModal
            Produits={produit}
            selectedProduits={selectedProduits}
            onClose={() => setShowArticlesModal(false)}
            onAddProduits={handleAddProduits}
          />
        )}

        <div className="btns" style={styles.btns}>
          <button
            type="button"
            onClick={onClose}
            className="cancel"
            style={styles.cancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            onChange={handleCreateArticle}
            className="create"
            style={styles.create}
          >
            Create Article
          </button>
        </div>
      </div>
    </form>
  );
}
const styles = {
  createRoleForm: {
    width: "100%",
    height: "500px",
    borderRadius: "30px",
    marginTop: "-17%",
    marginLeft: "-20px",
    backgroundColor: "white",
    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
  },
  formGroupCreateRole: {
    height: "300px",
    width: "80%",
    marginLeft: "70px",
  },
  input: {
    paddingLeft: "20px",
    display: "block",
    color: "#5B548E",
  },
  input1: {
    width: "350px",
    height: "40px",
    paddingLeft: "15px",
    borderRadius: "30px",
    transition: "border-color 0.3s ease",
    color: "#656e77",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500, // medium
    fontSize: "15px",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: "10px",
    border: "none",
  },
  title1: {
    marginTop: "50px",
    color: "#5B548E",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600, // Semi-bold
    fontSize: "25px",
    marginBottom: "20px",
    textAlign: "center",
  },
  btn: {
    textDecoration: "none",
    width: "130px",
    height: "40px",
    borderRadius: "15px",
    marginTop: "30px",
    transition: "border-color 0.3s ease",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500, // medium
    fontSize: "16px",
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    textAlign: "center",
    marginRight: "1rem",
  },
  create: {
    backgroundColor: "#0047FF",
    color: "white",
    border: "1px solid #F0F4F6",
    borderRadius: "20px",
    width: "200px",
    height: "45px",
    marginTop: "30px",
  },
  cancel: {
    color: "#0047FF",
    backgroundColor: "white",
    border: "1px solid #0047FF",
    borderRadius: "20px",
    width: "200px",
    height: "45px",
    marginTop: "30px",
  },
  btns: {
    display: "flex",
    justifyContent: "center", // Center horizontally
    gap: "20px",
  },
  ch: {
    marginLeft: "90px",
  },
};

export default CreateRoleForm;
