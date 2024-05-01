import axios from "axios";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function PerLine(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setIsVisible(false);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.delete(`http://localhost:3036/chapters/${props.id}`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(resp.data);
      } catch (error) {
        console.log("failed to delete chapter",error);
      }
    } catch (error) {
     navigate('/login')
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
          <p className="name">{props.rolenam}</p>
          <Link
            className="del"
            style={{ color: " blue" }}
            to={`/chapter/${props.id}`}
          >
            View
          </Link>
          <button className="del" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
export default PerLine;
