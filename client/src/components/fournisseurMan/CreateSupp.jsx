// CreateUserForm.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateSupplier({ onClose }) {
  const navigate = useNavigate()
  const [supplierData, setsupplierData] = useState({
    name: "",
    email: "",
    address: "",
    phone_num: "",
    registre_c: "",
    NIF: "",
    RIB: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Vérification si tous les champs requis sont remplis
    const isFormValid = Object.values(supplierData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Veuillez remplir tous les champs avant de créer le fournisseur.");
      return; // Arrêter l'exécution de la fonction si le formulaire n'est pas valide
    }
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.post(
          `http://localhost:3036/suppliers`,
          supplierData,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(resp.data);
        navigate('/supp')
      } catch (error) {
        alert('failed to create supplier')
        console.log(error);
      }
    } catch (error) {
      navigate('/login')
    }
    onClose()
    // Si le formulaire est valide, continuer avec la création du fournisseur

    // Réinitialiser les données du formulaire après la création
    setsupplierData({
      name: "",
      email: "",
      phone_num: "",
      registre_c: "",
      NIF: "",
      RIB: "",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        borderRadius: "30px",
        boxShadow: "0 2px 5px #100B39",
        width: "600px",
        height: "650px", // Modifiez la hauteur ici si nécessaire
        padding: "20px",
        zIndex: "103", // z-index n'a pas besoin de #
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="title1">Create Supplier</div>

        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "16px",
          }}
        >
          {" "}
          name ou raison sociale:{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="text"
          id="username"
          name="name"
          onChange={(e) =>
            setsupplierData({ ...supplierData, name: e.target.value })
          }
          required
        />

        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "16px",
          }}
        >
          {" "}
          Address:{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="text"
          id="address"
          name="address"
          onChange={(e) =>
            setsupplierData({ ...supplierData, address: e.target.value })
          }
          required
        />
        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "16px",
          }}
        >
          {" "}
          Adresse email:{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="email"
          id="username"
          name="username"
          onChange={(e) =>
            setsupplierData({ ...supplierData, email: e.target.value })
          }
          required
        />

        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "18px",
          }}
        >
          {" "}
          Téléphone et Fax:{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="text"
          id="username"
          name="username"
          onChange={(e) =>
            setsupplierData({ ...supplierData, phone_num: e.target.value })
          }
          required
        />

        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "18px",
          }}
        >
          {" "}
          N° R.C:{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="text"
          id="username"
          name="username"
          onChange={(e) =>
            setsupplierData({ ...supplierData, registre_c: e.target.value })
          }
          required
        />

        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "18px",
          }}
        >
          {" "}
          numéro d'identification fiscale (NIF):{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="text"
          id="username"
          name="username"
          onChange={(e) =>
            setsupplierData({ ...supplierData, NIF: e.target.value })
          }
          required
        />

        <div
          style={{
            marginLeft: "50px",
            color: "#616262",
            fontSize: "14px",
            color: "#5B548E",
            fontSize: "18px",
          }}
        >
          {" "}
          RIB (ou RIP):{" "}
        </div>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            borderRadius: "17px",
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
            padding: "20px ",
            color: "black",
          }}
          type="text"
          id="username"
          name="username"
          onChange={(e) =>
            setsupplierData({ ...supplierData, RIB: e.target.value })
          }
          required
        />

        <div className="btns" style={{ marginTop: "10px", marginLeft: "50px" }}>
          <button
            onClick={onClose}
            className="cancel btn"
            style={{ width: "700px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="create btn"
            style={{ width: "100% " }}
          >
            Create{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSupplier;
