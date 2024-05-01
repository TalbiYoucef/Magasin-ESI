import React, { useState } from "react";

import { Link} from "react-router-dom";

function PerLine(props) {
  const {id} = props;
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    setIsVisible(false);
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
            <Link to={`/article/${id}/produits`} className="del" style={{ color: "blue" }}>
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
