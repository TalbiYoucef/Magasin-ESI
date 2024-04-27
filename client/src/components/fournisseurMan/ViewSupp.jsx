// CreateUserForm.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewSupplier({ onClose, id }) {
  const [SupplierData, setSupplierData] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useState(SupplierData);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setAccessToken(res.data.accessToken);
        const resp = await axios.get(`http://localhost:3036/suppliers/${id}/`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        setSupplierData(resp.data.supplier);
        console.log(resp.data);
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirm = window.confirm('Are you sure you want to save changes ?')
    if(confirm){
      try {
        const res = await axios.put(
          `http://localhost:3036/suppliers/${id}/`,
           SupplierData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    onClose();
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
        height: "600px", // Modifiez la hauteur ici si nécessaire
        padding: "20px",
        zIndex: "103", // z-index n'a pas besoin de #
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            width: "470px",
            height: "40px",
            padding: "20px ",
            color: "#5B548E",
            border: "none",
          }}
          className="title1"
          type="text"
          id="username"
          name="nom"
          value={SupplierData.name}
          required
        />

        <div></div>
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
          Nom ou raison sociale:{" "}
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
          name="nom"
          value={SupplierData.name}
          onChange={(e) =>
            setSupplierData({ ...SupplierData, name: e.target.value })
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
          value={SupplierData.email}
          onChange={(e) =>
            setSupplierData({ ...SupplierData, email: e.target.value })
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
          value={SupplierData.phone_num}
          onChange={(e) =>
            setSupplierData({ ...SupplierData, phone_num: e.target.value })
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
          value={SupplierData.registre_c}
          onChange={(e) =>
            setSupplierData({ ...SupplierData, registre_c: e.target.value })
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
          value={SupplierData.NIF}
          onChange={(e) =>
            setSupplierData({ ...SupplierData, NIF: e.target.value })
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
          value={SupplierData.RIB}
          onChange={(e) =>
            setSupplierData({ ...SupplierData, RIB: e.target.value })
          }
          required
        />

        <div className="btns" style={{ marginTop: "10px" }}>
          <button
            onClick={handleSubmit}
            className="create btn"
            style={{ width: "100% " }}
          >
            OK{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ViewSupplier;
