import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Rollig(props) {

  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.delete(`http://localhost:3036/commands/${props.id}`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log('deleted',props.id)
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
    setIsVisible(false);
  };

  //-------------------------

  //------------------

  return (
    <div>
      {isVisible && (
        <div
          style={{
            width: "95%",
            height: "5px",
            display: "flex",
            backgroundColor: "white",
            alignItems: "center",
            marginTop: "10px",
            padding: "20px",
            gap: "50px",
          }}
        >
          <input
            type="checkbox"
            style={{ marginLeft: "-110px", width: "38%" }}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div style={{ display: "flex", gap: "30px", width: "100%" }}>
            <p
              style={{
                fontSize: "15px",
                width: "20%",
                color: "rgba(58, 53, 65, 0.87)",
                marginTop: "10px",
              }}
            >
              {props.id}
            </p>
            <p
              style={{
                width: "30%",
                fontSize: "15px",
                width: "200px",
                color: "rgba(58, 53, 65, 0.87)",
                marginTop: "10px",
              }}
            >
              {props.date}
            </p>
          </div>
          <Link
            to={`/view-demande-fourniture/${props.id}`}
            style={{
              marginLeft: "50px",
              textDecoration: "none",
              color: "blue",
            }}
          >
            View
          </Link>
          <Link
            to={`/edit-cmdi/${props.id}`}
            style={{
              textDecoration: "none",
              marginLeft: "20px",
              width: "100px",
              color: "#FA9E15",
            }}
          >
            Edit
          </Link>
          <button
            style={{
              textDecoration: "none",
              width: "100px",
              marginRight: "50px",
              color: "#D42803",
              backgroundColor: "white",
              border: "none",
              fontSize: "18px",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Rollig;
