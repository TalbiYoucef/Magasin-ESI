// CmdComp.js

import React, { useState } from "react";

function SortieComp({ filteredProducts, onAddCmd }) {
  const [selectedPro, setSelectedPro] = useState("");
  const [quantity, setQuantity] = useState(""); // Quantite Servie
  const [NumInventaire, setNumInventaire] = useState("");
  const [Observations, setObservations] = useState("");
  const [quantityDemande, setQuantityDemande] = useState("");
  const [command, setCommand] = useState({
    //les infos roturné demande de fourniteur
    id: "0",
    date: "04-03-2024",
    service: "comité des oeuvres sociales",
    products: [
      { idp: 0, nommP: "Produit 1", quantiteDemande: "100" },
      { idp: 1, nommP: "Produit 2", quantiteDemande: "50" },
      { idp: 2, nommP: "Produit 3", quantiteDemande: "60" },
      { idp: 3, nommP: "Produit 4", quantiteDemande: "900" },
      { idp: 4, nommP: "Produit 5", quantiteDemande: "90" },
    ],
  });
  const productOnChange = (e) => {
    setSelectedPro(e.target.value);
  };

  const quantityOnChange = (e) => {
    setQuantity(e.target.value);
  };
  const NumInventaireOnChange = (e) => {
    setNumInventaire(e.target.value);
  };
  const ObservationsOnChange = (e) => {
    setObservations(e.target.value);
  };

  const handleAddCmd = () => {
    if (selectedPro && quantity && NumInventaire != "" && Observations != "") {
      // Créer un objet de données de commande
      if (quantity > 0) {
        const cmdData = {
          id: Math.floor(Math.random() * 10000), // Générer un identifiant unique pour la commande
          selectedPro: selectedPro,
          quantitéServie: quantity,
          quantityDemande: command.products.find(
            (product) => product.nommP === selectedPro
          )?.quantiteDemande,
          NumInventaire: NumInventaire,
          Observations: Observations,
        };

        // Passer les données de la commande à la fonction de gestion de l'ajout
        onAddCmd(cmdData);

        // Réinitialiser les champs
        setSelectedPro("");
        setQuantity("");
        setNumInventaire("");
        setObservations("");
      } else {
        alert("quantity must be strictly  positive ");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div style={{ display: "flex", gap: "5px", marginTop: "40px" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          marginLeft: "1.5%",
          marginRight: "1.5%",
          marginBottom: "2%",
          display: "flex",
          gap: "40px",
        }}
      >
        <div className="pro30" style={{ width: "40%" }}>
          <p
            style={{
              color: "#5B548E",
              marginBottom: "5px",
              fontSize: "16px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            {" "}
            Product :
          </p>
          <select
            onChange={productOnChange}
            value={selectedPro}
            style={{
              width: "100%",
              padding: "5px",
              marginLeft: "3px",
              paddingLeft: "20px",
              height: "45px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
              color: "rgba(58,53,65,0.87)",
            }}
          >
            <option value="">Products</option>
            {filteredProducts.map((product, i) => (
              <option key={i} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ width: "20%" }}>
          <p
            style={{
              color: "#5B548E",
              marginBottom: "5px",
              fontSize: "16px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            Qt Demandé:
          </p>
          <p
            type="number"
            style={{
              color: "#666666",
              width: "100%",
              textAlign: "center",
              padding: "5px",
              paddingTop: "10px",
              height: "45px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
            }}
          >
            {" "}
            {command.products.find((product) => product.nommP === selectedPro)
              ?.quantiteDemande || "quant demande"}
          </p>
        </div>
        <div className="quan30" style={{ width: "21%" }}>
          <p
            style={{
              color: "#5B548E",
              marginBottom: "5px",
              fontSize: "16px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            Quant Servie:
          </p>
          <input
            onChange={quantityOnChange}
            value={quantity}
            type="number"
            placeholder="Quantité"
            style={{
              width: "100%",
              padding: "5px",
              paddingLeft: "20px",
              height: "47px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
              color: "rgba(58,53,65,0.87)",
            }}
          />
        </div>
        <div className="quan30" style={{ width: "35%" }}>
          <p
            style={{
              color: "#5B548E",
              marginBottom: "5px",
              fontSize: "16px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            {" "}
            N° Inventaire
          </p>
          <input
            placeholder="N° Inventaire"
            onChange={NumInventaireOnChange}
            value={NumInventaire}
            style={{
              width: "100%",
              padding: "5px",
              paddingLeft: "20px",
              height: "47px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
              color: "rgba(58,53,65,0.87)",
            }}
          />
        </div>
        <div className="quan30" style={{ width: "40%" }}>
          <p
            style={{
              color: "#5B548E",
              fontSize: "16px",
              marginBottom: "5px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            Observations
          </p>
          <input
            placeholder="Observations"
            onChange={ObservationsOnChange}
            value={Observations}
            style={{
              width: "100%",
              padding: "5px",
              overflowY: "100% auto",
              paddingLeft: "20px",
              height: "47px",
              backgroundColor: "white",
              borderRadius: "30px",
              boxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              WebkitBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              MozBoxShadow: "0px 1px 18px -12px rgba(0,0,0,0.52)",
              border: "none",
              color: "rgba(58,53,65,0.87)",
            }}
          />
        </div>

        <button
          onClick={handleAddCmd}
          style={{
            borderRadius: "20px",
            height: "40px",
            width: "150px",
            paddingRight: "10px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            backgroundColor: "#17BF6B",
            justifyContent: "center",
            color: "white",
            border: "none",
            marginTop: "55px",
            textAlign: "center",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default SortieComp;
