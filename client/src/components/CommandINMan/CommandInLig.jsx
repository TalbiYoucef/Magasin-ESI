import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Rollig(props) {

  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
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
            <p
              style={{
                width: "30%",
                fontSize: "15px",
                width: "200px",
                color: "rgba(58, 53, 65, 0.87)",
                marginTop: "10px",
              }}
            >
              {props.status}
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
            to={`/${props.link}/${props.id}`}
            style={{
              textDecoration: "none",
              marginLeft: "20px",
              width: "100px",
              color: "#FA9E15",
            }}
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default Rollig;
