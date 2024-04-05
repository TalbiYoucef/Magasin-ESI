import React, { useState } from "react";
import "./rollig.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Rollig(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleViewRole = () => {
    props.onView(props.roleName);
  };

  const handleDelete = async () => {
    alert(`are you sure you wanna delete this role`)
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      const accessToken = res.data.accessToken;
      await axios.delete(`http://localhost:3036/roles/${props.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      setIsVisible(false);
    } catch (error) {
      console.log(error);
      alert("failed to delete role");
    }
  };

  return (
    <div>
      {isVisible && (
        <div className="oper">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p className="name">{props.roleName}</p>
          <Link className="edi" onClick={handleViewRole}>
            Edit
          </Link>
          <button className="del" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
export default Rollig;
