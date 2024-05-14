import React, { useState, useEffect } from "react";

function ProduitsModal({ Produits, selectedProduits, onClose, onAddProduits }) {
  const [selected, setSelected] = useState([...selectedProduits]); // Utilisez le spread operator pour créer une copie de selectedPermissions

  const handleSelectProduits = (ProduitsName) => {
    const index = selected.indexOf(ProduitsName);
    if (index === -1) {
      setSelected([...selected, ProduitsName]);
    } else {
      setSelected(selected.filter((Produit) => Produit !== ProduitsName));
    }
  };

  const handleAddProduits = () => {
    if (selected.length === 0) {
      alert("Please select at least one Produits!");
      return;
    }
    onAddProduits(selected);
    console.log("sele ///produit", selected);
    onClose();
  };

  return (
    <div className="modal-list-roles" style={{ width: "500px", height: "" }}>
      <div
        className="modal-content-list-roles"
        style={{marginTop: "0px" }}
      >
        <h2 className="title">Produits </h2>
        <ul
          className="role-model-list"
          style={{ maxHeight: "200px", width: "90%", overflowY: "auto" }}
        >
          {Produits.map((Produit) => (
            <li key={Produit.id}>
              <label className="role-model-label">
                <input
                  type="checkbox"
                  value={Produit.name}
                  checked={selected.includes(Produit.name)}
                  onChange={() => handleSelectProduits(Produit.name)}
                />
                <span className="role-model-name"> {Produit.name}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="btns">
          <button type="button" onClick={onClose} className="cancel btn">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddProduits}
            className="create btn"
          >
            Add Produits
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProduitsModal;
