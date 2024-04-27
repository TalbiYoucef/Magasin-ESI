import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./PerLine.jsx";
import Barrr from "../permissionsMan/barrr.jsx";
import PermissionsModal from "../rolesMan/PermissionsModal";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function ViewRole() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();
  const { id } = useParams();
  const [rolePermissions, setRolePermissions] = useState([]);
  const [user, setUser] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        const resp = await axios.get(
          `http://localhost:3036/roles/${id}/permissions/`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setRolePermissions(resp.data);
        const perm = await axios.get(`http://localhost:3036/permissions/`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        setPermissions(perm.data);
        const role = await axios.get(`http://localhost:3036/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        setRole(role.data);
        // Set users with the data from the response
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, [rolePermissions]);

  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedPermissions, setSelectedPermissions] =
    useState(rolePermissions);
  const permissionIds = rolePermissions.map((rp) => rp.permission_id);
  const rolesList = permissions
    .filter((per) => permissionIds.includes(per.permission_id))
    .map((pr) => pr.name)
    .map((perm, index) => (
      <PerLine key={index} rolenam={perm} /> // Passer la fonction handleViewRole comme prop
    ));

  const handleAddPermissions = (permission) => {
    permissions
      .filter((per) => permission.includes(per.name))
      .map((per) => per.permission_id)
      .forEach(async (perm) => {
        await axios
          .put(
            `http://localhost:3036/roles/${id}/permissions/`,
            {
              permission_id: perm,
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
            setRolePermissions([])
          })
          .catch((err) => {
            console.log(err);
          });
      });
      
    setShowPermissionsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };

  const handleConfirm = () => {
    const confirm = window.confirm(
      "Are you sure you want to leave this page ?"
    );
    if (confirm) {
      navigate("/roles");
    }
  };

  return (
    <div>
      <Nav username={user.username} />
      <div style={{ display: "flex", height: "92vh" }}>
        <Side link="roles" />
        <div
          style={{
            width: "85%",
            marginLeft: "10%",
            marginTop: " 8vh",
          }}
        >
          <div
            style={{
              position: "fixed",
              height: "22vh",
              backgroundColor: "white",
              width: "85%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: " space-between ",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    marginLeft: "60px",
                    color: "#616262",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  Role name{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "280px",
                    height: "40px",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                    padding: "20px ",
                    color: "#616262",
                    marginLeft: "40px",
                  }}
                >
                  <input
                    type="text"
                    disabled
                    placeholder={role.name}
                    style={{ border: "none", height: "30px" }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginRight: "40px",
                }}
              >
                <button
                  style={{
                    textDecoration: "none",
                    width: "140px",
                    height: "40px",
                    borderRadius: "30px",
                    marginTop: "30px",
                    transition: "border-color 0.3s ease",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "500", // medium
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    textAlign: "center",
                    backgroundColor: "#0047FF",
                    boxShadow: "none",
                    border: "none",
                    color: "white",
                  }}
                  type="button"
                  onClick={() => setShowPermissionsModal(true)}
                >
                  Add Permissions
                </button>

                <button
                  style={{
                    textDecoration: "none",
                    width: "140px",
                    height: "40px",
                    borderRadius: "30px",
                    marginTop: "30px",

                    transition: "border-color 0.3s ease",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "500", // medium
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    textAlign: "center",
                    backgroundColor: "#FA9E15",
                    boxShadow: "none",
                    border: "none",
                    color: "white",
                  }}
                  onClick={handleConfirm}
                >
                  {" "}
                  Roles List{" "}
                </button>

                {showPermissionsModal && (
                  <PermissionsModal
                    Permissions={permissions}
                    selectedPermissions={selectedPermissions}
                    onClose={() => setShowPermissionsModal(false)}
                    onAddPermissions={handleAddPermissions}
                  />
                )}
              </div>
            </div>
            <Barrr />
          </div>
          <div
            style={{
              paddingtop: "20px",
              marginTop: "30vh",
              width: "85%",
              marginLeft: "20px",
            }}
          >
            {rolesList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRole;
