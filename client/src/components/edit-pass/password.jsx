import React, { useState } from "react";
import "./password.css";
import pro from "../../assets/profil_sans_photo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function EditPass() {
  const [err,setErr] = useState('')
  // State variables for user information
  const [Oldpassword, setOldPassword] = useState("");
  const [Newpassword, setNewPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false); // State to control whether to show the message
  const [message, setMessage] = useState(""); // State for displaying validation messages
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      console.log("reres", res.data);
      setUser(res.data.user);
      await axios
        .post(
          "http://localhost:3036/auth/login",
          {
            email: user.email,
            password: Oldpassword,
          },
          {
            withCredentials: true,
          }
        )
        .then(async (resp) => {
          await axios
            .put(
              "http://localhost:3036/resetpassword",
              {
                email: user.email,
                newPassword: Newpassword,
              },
              {
                withCredentials: true,
              }
            )
            .then((resp) => {
              navigate("/setting");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => setErr("Old Password Incorrrect"));
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
    
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowMessage(message !== "");
    setMessage(message);

    // Hide the message after 5 seconds
    if (message) {
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to exit ?");
    if (isConfirmed) {
      // Clear all input fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/setting");
      setMessage("");
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <li className="profil-user" style={{ marginLeft: "180px" }}>
        <div className="imgBox">
          <img src={pro} alt="profil" />
        </div>
        <div>
          <p className="profilename"> {user.username}</p>
        </div>
        <p className="ena">{user.status}</p>
      </li>

      <div
        className="container pwd"
        style={{ marginLeft: "300px", paddingBottom: "40px" }}
      >
        <p>Edit password</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Oldpassword">Old password</label>
            <input
              type="password"
              id="Oldpassword"
              value={Oldpassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Newpassword">New password</label>
            <input
              type="password"
              id="Newpassword"
              value={Newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Confirmpassword">Confirm password</label>
            <input
              type="password"
              id="Confirmpassword"
              value={Confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {showMessage && <p className="password-warning">{message}</p>}
          <div className="btns">
            <button className="cancel btn " onClick={handleCancelClick}>
              Cancel
            </button>
            <button type="submit" className="create btn">
              Save
            </button>
          </div>
        </form>
        {err && <span style={{color:"red"}}>{err}</span>}

      </div>
    </div>
  );
}

export default EditPass;
