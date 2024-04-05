import React, { useState, useEffect } from "react";
import "./admin.css";
import pro from "../../assets/profil_sans_photo.jpg";
import RoleModal from "./RoleModal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [rolesIds, setRolesIds] = useState([]);
  const [roles, setRoles] = useState([]); // Utilisez une nouvelle variable d'état pour les rôles
  const [selectedUser, setselectedUser] = useState({});
  const [userRoles, setUserRoles] = useState([]); // userRolesIds
  const [serviceId, setServiceId] = useState();
  const [services, setServices] = useState([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [username, setusername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [status, setStatus] = useState();
  const [service, setService] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setToken(res.data.accessToken);
        setUser(res.data.user);
        try {
          const resp = await axios.get(`http://localhost:3036/roles`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setRoles(resp.data);
          try {
            const response = await axios.get(
              `http://localhost:3036/users/${id}/roles`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`,
                },
                withCredentials: true,
              }
            );
            setRolesIds(response.data);

            const userRoleNames = resp.data
              .filter((role) => response.data.includes(role.role_id))
              .map((role) => role.name);
            setUserRoles(userRoleNames);
            setSelectedRoles(userRoleNames)

          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(`http://localhost:3036/services`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setServices(resp.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(`http://localhost:3036/users/${id}`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setselectedUser(resp.data);
          setusername(resp.data.username);
          setAddress(resp.data.address);
          setEmail(resp.data.email);
          setFirstName(resp.data.firstname);
          setLastName(resp.data.lastname);
          setPhoneNumber(resp.data.phone_num);
          setStatus(resp.data.status);
          setServiceId(resp.data.service_id);
          setService(
            services
              .filter((ser) => ser.service_id == serviceId)
              .map((ser) => ser.name)
          );
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleCancelClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to exit ?");
    if (isConfirmed) {
      navigate("/users");
    }
  };
  console.log(userRoles);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation d'e-mail
    if (!validateEmail(email)) {
      alert("The domain must be @esi-sba.dz");
    } else {
      if (selectedRoles.length === 0) {
        alert("Please select at least one role!");
        return;
      } else {
        const isConfirmed = window.confirm(
          "Are you sure you want to save the changes?"
        );

        if (isConfirmed) {
          try {
            await axios
              .put(
                `http://localhost:3036/users/${id}/editprofile`,
                {
                  firstName,
                  lastName,
                  email,
                  address,
                  status,
                  phone_num: phoneNumber,
                  service_id: serviceId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  withCredentials: true,
                }
              )
              .then(async () => {
                console.log("done");
                try {
                  await axios.put(
                    `http://localhost:3036/users/${id}/roles`,
                    {
                      roles: rolesIds,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      withCredentials: true,
                    }
                  );
                  console.log("roles up to date ");
                } catch (error) {
                  console.log("could not update user roles");
                }
              });
          } catch (error) {
            console.log("failed to update user");
          }
          console.log(
            firstName,
            lastName,
            email,
            address,
            rolesIds,
            serviceId,
            status,
            phoneNumber
          );
        }
      }
    }
  };

  const validateEmail = (email) => {
    const domain = email.split("@")[1];
    return domain === "esi-sba.dz";
  };

  const handleAddRoles = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
    setRolesIds(
      roles
        .filter((role) => selectedRoles.includes(role.name))
        .map((role) => role.role_id)
    );
    setShowRoleModal(false);
  };
  return (
    <div style={{ paddingBottom: "30px" }}>
      <div className="profil-user">
        <div className="imgBox">
          <img src={pro} alt="profil" />
        </div>
        <div>
          <p className="profilename">{username}</p>
          <p className="admin">{userRoles.join(",")}</p>
        </div>
        <p className="ena">{status}</p>
      </div>

      <div className="frame1">
        <form onSubmit={handleSubmit}>
          <div className="title1">Edit User Informations</div>

          <div className="form-row1">
            <div className="form-group1">
              <label htmlFor="firstName" className="input">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                className="input1"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="lastName" className="input">
                Last name
              </label>
              <input
                type="text"
                className="input1"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row1">
            <div className="form-group1">
              <label htmlFor="email" className="input">
                Email
              </label>
              <input
                type="email"
                className="input1"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="address" className="input">
                Address
              </label>
              <input
                type="text"
                className="input1"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row1">
            <div className="form-group1">
              <label htmlFor="phoneNumber" className="input">
                Phone number
              </label>
              <input
                type="text"
                className="input1"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="status" className="input">
                Status
              </label>
              <select
                type="text"
                className="input1"
                id="status"
                value={status}
                onChange={(e) => {setStatus(e.target.value)
                console.log(status)}}
                style={{
                  borderRadius: "30px",
                  paddingLeft: "20px",
                  marginRight: "40px",
                }}
              >
                <option value={status}>{status} </option>
                {!(status === "active") && (
                  <option value="active">Active</option>
                )}
                {!(status === "disactive") && (
                  <option value="disactive">Disactive</option>
                )}
                {!(status === "enable") && (
                  <option value="enable">Enabled</option>
                )}
                {!(status === "disable") && (
                  <option value="disable">Disabled</option>
                )}
              </select>
            </div>
          </div>

          {/* Service selection */}
          <div className="form-row1">
            <div className="form-group1">
              <label htmlFor="service" className="input">
                Service
              </label>
              <select
                id="service"
                className="input1"
                value={service}
                onChange={(e) => setServiceId(e.target.value)}
                style={{
                  borderRadius: "30px",
                  paddingLeft: "20px",
                  marginRight: "40px",
                }}
              >
                {services.map((service) => {
                  return (
                    <option value={service.service_id}>{service.name}</option>
                  );
                })}
                {/* Add other service options here */}
              </select>
            </div>

            {/* Role selection */}
            <div className="form-group1">
              <label htmlFor="Roles" className="input">
                Roles:
              </label>
              <div
                className="input1"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: "40px",
                  marginLeft: "40px",
                  borderRadius: "30px",
                  height: "100%",
                }}
              >
                <div>
                  {selectedRoles.map((role, index) => (
                    <div key={index}>{role}</div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowRoleModal(true)}
                  style={{ border: "none", background: "none" }}
                >
                  Choose Roles
                </button>
              </div>
            </div>

            {showRoleModal && (
              <RoleModal
                roles={roles}
                selectedRoles={selectedRoles}
                onClose={() => setShowRoleModal(false)}
                onAddRoles={handleAddRoles}
              />
            )}
          </div>

          <div className="btns" style={{ marginTop: "40px" }}>
            <button
              type="button"
              onClick={handleCancelClick}
              className="cancel btn"
            >
              Cancel
            </button>
            <button type="submit" className="create btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
