import React, { useState } from "react";

import { Link } from "react-router-dom";

function PerLine(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVisible, setIsVisible] = useState(true);

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
              to={`/ficheInventaire/${props.id}`}
              className="del"
              style={{ color: "green"}}
            >
              Inventaire
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default PerLine;
