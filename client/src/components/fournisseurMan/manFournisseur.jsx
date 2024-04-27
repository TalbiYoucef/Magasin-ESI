import React, { useEffect, useState } from "react";
import "./manFournisseur.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { BsSearch } from "react-icons/bs"; //Fournisseur data
import Per from "./FournisseurLig.jsx";
import CreateSupplier from "./CreateSupp.jsx";
import ViewSupplier from "./ViewSupp.jsx";
import axios from "axios";
//import Edit from './ViewEdit.jsx';
import Barr from "./barFornisseur.jsx";
import { Link, useNavigate } from "react-router-dom";
function Fornisseur() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [showCreateSupplierForm, setShowCreateSupplierForm] = useState(false);
  const [showViewSupplierForm, setShowViewSupplierForm] = useState(false);
  const [user, setUser] = useState({});
  const [id, setId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        // setAccessToken(res.data.accessToken);

        const supp = await axios.get(`http://localhost:3036/suppliers/`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(supp.data.suppliers);
        setSuppliers(supp.data.suppliers);
        // Set users with the data from the response
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredSupp = suppliers.filter((element) =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const rolesList = filteredSupp.map((supplier, index) => (
    <Per
      key={index}
      id={supplier.supplier_id}
      name={supplier.name}
      onView={(id) => {
        setId(id);
        setShowViewSupplierForm(true);
      }}
    />
  ));
  const handleCreateChapitre = (newChapitre) => {
    const updatedChapitres = [...suppliers, newChapitre];
    setSuppliers(updatedChapitres);
    setShowCreateSupplierForm(false); // Masquer le formulaire de création de chapitre après création réussie
  };
  const toggleCreateChapitreForm = () => {
    setShowCreateSupplierForm(!showCreateSupplierForm);
  };
  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnrole">
        <Side className="siddd" link="roles" />
        <div className="Sect2role">
          <div className="upchap">
            <div className="uprole1">
              <div className="Search">
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="search Supplier"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  style={{ border: "none", height: "30px", width: "120px" }}
                />
              </div>
              <div className="create-list">
                <Link
                  onClick={toggleCreateChapitreForm}
                  className="btn-create-usr"
                >
                  Create Supplier
                </Link>
              </div>
            </div>
            <Barr />
          </div>
          <div className="downchap">{rolesList}</div>
        </div>
      </div>
      {showCreateSupplierForm && (
        <div className="modal-overlay-create-role">
          <div
            className="modal-content"
            style={{ height: "500px", width: "700px", marginTop: "200px" }}
          >
            <CreateSupplier
              onCreateChapitre={handleCreateChapitre}
              onClose={() => setShowCreateSupplierForm(false)}
            />
          </div>
        </div>
      )}
      {showViewSupplierForm && (
        <div className="modal-overlay-create-role">
          <div
            className="modal-content"
            style={{ height: "500px", width: "700px", marginTop: "200px" }}
          >
            <ViewSupplier
              id={id}
              onCreateChapitre={handleCreateChapitre}
              onClose={() => setShowViewSupplierForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Fornisseur;
