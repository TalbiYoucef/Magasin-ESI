import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateRoleForm from "../viewArticle/ProductsModal";

function ArtLin(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [showViewProduitForm, setShowViewProduitForm] = useState(false);
  const toggleViewProduitForm = () => {
    setShowViewProduitForm(!showViewProduitForm);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div
          className="oper"
          style={{
            width: "93%",
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
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p className="name" style={{ textAlign: "left", width: "800px" }}>
            {props.name}
          </p>
          {/* <Link
            // onClick={toggleViewProduitForm}
            className="edi"
            style={{
              textDecoration: "none",
              width: "100px",
              color: "#0047FF",
              marginLeft: "200px",
            }}
          >
            View
          </Link> */}
          <button
            className="del"
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
      {showViewProduitForm && (
        <div className="modal-overlay-create-role">
          <div
            className="modal-content"
            style={{ height: "500px", width: "700px", marginTop: "200px" }}
          >
            <CreateRoleForm onClose={() => setShowViewProduitForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
export default ArtLin;
