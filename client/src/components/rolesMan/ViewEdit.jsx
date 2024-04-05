import React, { useEffect, useState } from "react";
import "./createRole.css";
import PermissionsModal from "./PermissionsModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Edit({ onClose, onUpdate, role }) {
  const navigate = useNavigate();

  const [selectedRole, setselectedRole] = useState(role);
  const [rolename, setRolename] = useState(role.name);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]); // Données de la base de données des permission
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        const perms = await axios.get("http://localhost:3036/permissions", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(perms.data);
        setPermissions(perms.data);
         await axios.get(`http://localhost:3036/roles/${role.role_id}/permissions/`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        // Set users with the data from the response
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleAddPermissions = (permissions) => {
    setSelectedPermissions(permissions);
    setShowPermissionsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };

  const handleEditRole = (event) => {
    event.preventDefault();

    if (!rolename) {
      alert("Please enter a role name!");
      return;
    }

    if (selectedPermissions.length === 0) {
      alert("Please select at least one permission!");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (isConfirmed) {
      const updatedRole = {
        new:selectedRole[0],
        name: rolename,
        permissions: selectedPermissions,
      };
      console.log(" updatedUser", updatedRole);
      alert("Information updated successfully");
      setselectedRole(updatedRole);
      onUpdate(updatedRole);
      setRolename("");
      setSelectedPermissions([]);
      onClose();
    }
  };

  return (
    <form
      className="create-role-form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="title1">Edit Role</div>
      <div className="form-group-create-role">
        <label htmlFor="rolenam" className="input">
          Role name
        </label>
        <div className="input1">
          <input
            type="text"
            id="rolenam"
            name="rolenam"
            className="input1"
            value={rolename}
            onChange={(e) => setRolename(e.target.value)}
            style={{
              height: "40px",
              border: "none",
              outline: "none",
              width: "200px",
            }}
            required
          />
        </div>
        <label htmlFor="Permissions" className="input">
          Permissions:
        </label>

        <div>
          <button
            className="input1"
            type="button"
            onClick={() => setShowPermissionsModal(true)}
            style={{ backgroundColor: "white" }}
          >
            Choose Permissions
          </button>
        </div>

        {showPermissionsModal && (
          <PermissionsModal
            Permissions={permissions}
            selectedPermissions={selectedPermissions}
            onClose={() => setShowPermissionsModal(false)}
            onAddPermissions={handleAddPermissions}
          />
        )}

        <div className="btns">
          <button type="button" onClick={onClose} className="cancel btn">
            Cancel
          </button>
          <button type="submit" onClick={handleEditRole} className="create btn">
            Edit Role
          </button>
        </div>
      </div>
    </form>
  );
}

export default Edit;
