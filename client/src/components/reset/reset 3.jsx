import React, { useState } from "react";
import "./card.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "./AppContext";

function Card3() {
  const navigate = useNavigate()
  const { email } = useAppContext();
  // État pour stocker le nouveau mot de passe et sa confirmation
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fonctions pour gérer les changements de mots de passe
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Fonction pour réinitialiser le mot de passe
  const resetPassword = async () => {
    // Vérifier si les mots de passe correspondent
    if (newPassword && newPassword === confirmPassword ) {
      await axios
        .put("http://localhost:3036/resetpassword", {
          email,
          newPassword,
        })
        .then((resp) => {
          navigate('/login')
        })
        .catch((err) => console.log(err));
      // Effectuer l'action de réinitialisation de mot de passe ici
      console.log("Password reset successfully");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="container reset1 mt-5 ">
      <img
        className="logo-img"
        src={logo}
        alt="My Image"
        style={{ width: "240px", height: "50px" }}
      />
      <div
        style={{ width: "500px", height: "400px" }}
        className="container partie2 mt-4 text-center   "
      >
        <div className="container text-center   ">
          <div className="title1">Reset password</div>
        </div>

        <div className="container mt-5">
          <div className="email-box text-center c1 ">
            <div>
              {" "}
              <input
                type="password"
                className="email-input"
                placeholder="New password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />{" "}
            </div>
            <div>
              {" "}
              <input
                type="password"
                className="email-input"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />{" "}
            </div>
            <button className="btn--reset" onClick={resetPassword}>
              Reset Password
            </button>
            <Link to="/login" className="return">
              {" "}
              Go back to login{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card3;
