import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PerLine(props) {
  const { id } = props;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = async () => {
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        await axios.delete(`http://localhost:3036/branches/${id}`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        setIsVisible(false);
      } catch (error) {
        console.log(error);
        alert("failed to delete the branch");
      }
    } catch (error) {
      navigate("/login");
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
          <div
            style={{
              marginLeft: "400px",
              marginRight: "-250px",
              display: "flex",
            }}
          >
            <Link
              to={`/article/${id}/produits`}
              className="del"
              style={{ color: "blue" }}
            >
              View
            </Link>
            <button className="del" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default PerLine;
