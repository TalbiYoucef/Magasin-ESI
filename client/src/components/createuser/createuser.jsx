// CreateUserForm.jsx
import React, { useState, useEffect } from "react";
import RoleModal from "./RoleModal";
import "./createUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateUserForm({ onCreateUser, onClose }) {
  const navigate = useNavigate();
  const [rolesIds, setRolesIds] = useState();
  const [roles, setRoles] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [serviceId, setServiceId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        // Fetch protected data using the access token
        const resp = await axios.get("http://localhost:3036/services", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        setServicesData(resp.data);
        const roles = await axios.get("http://localhost:3036/roles", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(roles.data);
        setRoles(roles.data);
        // Set users with the data from the response
      } catch (error) {
        // If an error occurs, redirect to the login page
        // navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    status: "enable",
    address: "",
    password: "",
    selectedService: "",
    selectedRoles: [],
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  // useEffect(() => {
  //   const storedRoles = JSON.parse(localStorage.getItem('selectedroles'));
  //   if (storedRoles) {
  //     setSelectedRoles(storedRoles);
  //   }
  // }, []);

  const handleAddRoles = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
    setRolesIds(
      roles
        .filter((role) => selectedRoles.includes(role.name))
        .map((role) => role.role_id)
    );
    setUserData({
      ...userData,
      selectedRoles,
    });
    setShowRoleModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    // Vérifie si l'e-mail se termine par "@esi-sba.dz"
    const domain = email.split("@")[1];
    return domain === "esi-sba.dz";
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setServiceId(
      servicesData
        .filter((ser) => ser.name == selectedService)
        .map((ser) => ser.service_id)
    );
    console.log(serviceId);
    setUserData({
      ...userData,
      selectedService,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(userData.email)) {
      alert("The domain must be @esi-sba.dz");
      return;
    }
    if (userData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (userData.selectedRoles.length === 0) {
      alert("Please select at least one role!");
      return;
    }

    onCreateUser({ userData, rolesIds, serviceId });
    setMessage("User created successfully");
    alert("User created successfully");

    setUserData({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      status: "enable",
      address: "",
      password: "",
      selectedService: "",
      selectedRoles: [],
    });
  };

  return (
    <form className="create-user-form">
      <div className="title1">Create User</div>
      <div className="form-row1">
        <div className="form-group1">
          <label htmlFor="username" className="input">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="input1"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="email" className="input">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input1"
            value={userData.email}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
      </div>
      <div className="form-row1">
        <div className="form-group1">
          <label htmlFor="firstName" className="input">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="input1"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="lastName" className="input">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="input1"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row1">
        <div className="form-group1">
          <label htmlFor="password" className="input">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input1 input_feild "
            value={userData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="confirmPassword" className="input">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input1"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            minLength={8}
            required
          />
        </div>
      </div>

      <div className="form-row1">
        <div className="form-group1">
          <label htmlFor="phone" className="input">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="input1"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="status" className="input">
            Status:
          </label>
          <select
            type="text"
            id="status"
            name="status"
            className="input1"
            value={"active"}
            onChange={handleChange}
            required
            disabled
          >
            <option value="">Select Status</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="form-row1">
        <div className="form-group1">
          <label htmlFor="service" className="input">
            Service:
          </label>
          <select
            type="text"
            id="service"
            name="selectedService"
            value={userData.selectedService}
            className="input1"
            onChange={handleServiceChange}
            required
            style={{ borderRadius: "30px", paddingLeft: "20px" }}
          >
            <option type="text" value="">
              Select service
            </option>
            {servicesData.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div type="text" className="form-group1">
          <label htmlFor="Roles" className="input">
            Roles:
          </label>
          <div
            type="text"
            className="input1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "40px",
              borderRadius: "30px",
              height: "100%",
            }}
          >
            <p type="text" style={{ marginTop: "10px" }}>
              {selectedRoles.join(",")}
            </p>
            <button
              type="button"
              onClick={() => setShowRoleModal(true)}
              style={{ border: "none", background: "none" }}
            >
              Choose Roles
            </button>
          </div>
        </div>
      </div>

      {/* Afficher la fenêtre modale des rôles si un service est sélectionné */}
      {showRoleModal && (
        <RoleModal
          roles={roles}
          selectedRoles={selectedRoles}
          onClose={() => setShowRoleModal(false)}
          onAddRoles={handleAddRoles}
        />
      )}

      <div className="btns" style={{ marginTop: "20px" }}>
        <button type="button" onClick={onClose} className="cancel btn">
          Cancel
        </button>
        <button onClick={handleSubmit} className="create btn">
          Create User
        </button>
      </div>

      {/* Afficher le message */}
      {message && <div>{message}</div>}
    </form>
  );
}

export default CreateUserForm;
