import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./user.css";
import axios from "axios";

function User(props) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleView = () => {
    navigate(`/EditUserProfile/${props.id}`);
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          axios.delete(`http://localhost:3036/users/${props.id}`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="usr">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="un">{props.username}</div>
      <div className="e">{props.email}</div>
      <div className="status">{props.status}</div>
      <Link
        to={`/EditUserProfile/${props.id}`}
        onClick={handleView}
        className="v"
      >
        View{" "}
      </Link>
      <button onClick={handleDelete} className="d">
        Delete
      </button>{" "}
      {/* Bouton pour supprimer l'utilisateur */}
    </div>
  );
}

export default User;
