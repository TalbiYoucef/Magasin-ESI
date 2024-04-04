import React, { useState, useEffect } from "react";
import "./editPro.css";
import pro from "../../assets/profil_sans_photo.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EditPro(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(props.user);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_num);
  const [status] = useState(user.status);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        const accessToken = res.data.accessToken;

        const [servicesResp, rolesResp, userRolesResp] = await Promise.all([
          axios.get("http://localhost:3036/services", {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }),
          axios.get("http://localhost:3036/roles", {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }),
          axios.get(`http://localhost:3036/users/${res.data.id}/roles`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }),
        ]);

        setServices(servicesResp.data);
        setRoles(rolesResp.data);
        setUserRoles(
          rolesResp.data
            .filter((role) => userRolesResp.data.includes(role.role_id))
            .map((role) => role.name)
        );
        const userSelectedService = servicesResp.data.find(
          (ser) => user.service_id === ser.service_id
        );
        setService(userSelectedService ? userSelectedService.name : "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCancelClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to exit ?");
    if (isConfirmed) {
      // Navigate to the setting page
      navigate("/setting");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert("The domain must be @esi-sba.dz");
    } else {
      const isConfirmed = window.confirm(
        "Are you sure you want to save the changes?"
      );
      if (isConfirmed) {
        try {
          const res = await axios.get("http://localhost:3036/refresh", {
            withCredentials: true,
          });
          const updusr = await axios.put(
            `http://localhost:3036/users/${res.data.id}/editprofile`,
            {
              firstName,
              lastName,
              email,
              address,
              phone_num: phoneNumber,
            },
            {
              headers: { Authorization: `Bearer ${res.data.accessToken}` },
              withCredentials: true,
            }
          );
          console.log(updusr);
        } catch (error) {
          console.log(error);
        }
        alert("Information updated successfully");
      }
    }
  };

  const validateEmail = (email) => {
    const domain = email.split("@")[1];
    return domain === "esi-sba.dz";
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <li className="profil-user" style={{ marginLeft: "180px" }}>
        <div className="imgBox">
          <img src={pro} alt="profil" />
        </div>
        <div>
          <p className="profilename"> {user.username}</p>
          <p className="admin">{user.role}</p>
        </div>
        <p className="ena">{status}</p>
      </li>

      <div className="frame1">
        <div className="title1">Edit profile informations</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row1" style={{ marginBottom: "15px" }}>
            <div className="form-group1">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  {
                    setFirstName(e.target.value);
                  }
                }}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row1" style={{ marginBottom: "15px" }}>
            <div className="form-group1">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row1" style={{ marginBottom: "15px" }}>
            <div className="form-group1">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="\+?[0-9]*"
              />
            </div>
            <div className="form-group1">
              <label htmlFor="status">Status</label>
              <input type="text" id="status" value={status} disabled />
            </div>
          </div>
          <div className="form-row1">
            <div className="form-group1">
              <label htmlFor="roles">Roles</label>
              <input type="text" id="roles" value={userRoles} disabled />
            </div>
            <div className="form-group1">
              <label htmlFor="service">Services</label>
              <input type="text" id="service" value={service} disabled />
            </div>
            <div className="form-row1"></div>
          </div>
          <div>
            <div className="btns" style={{ marginTop: "10px" }}>
              <Link className="cancel btn" onClick={handleCancelClick}>
                Cancel
              </Link>
              <button type="submit" className="create btn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPro;
