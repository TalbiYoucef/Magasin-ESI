import Perm from "../permissionsMan/perm";
import Perdata from "../permissionsMan/dataper"; // Import des données de la base de données des permissions
import React, { useEffect, useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link } from "react-router-dom";
import Baarr from "./baarrr";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EditRole(props) {
  const selectedRole = props.role;
  const [rolename, setRolename] = useState(selectedRole.name);
  const [user,setUser]=useState({})
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]); // Données de la base de données des permissions
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user)
        // Fetch protected data using the access token

        const roles = await axios.get("http://localhost:3036/roles", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(roles.data);
        setRoles(roles.data);

        const perms = await axios.get("http://localhost:3036/permissions", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(perms.data);
        setPermissions(perms.data);
        // Set users with the data from the response
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handlePermissionChange = (permission) => {
    const isChecked = selectedPermissions.includes(permission);
    if (isChecked) {
      setSelectedPermissions(
        selectedPermissions.filter((perm) => perm !== permission)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleCancelClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to exit?");
    if (isConfirmed) {
      window.location.href = "/users";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (isConfirmed) {
      const updatedRole = {
        ...selectedRole,
        name: rolename,
        permissions: selectedPermissions,
      };
      alert("Information updated successfully");
    }
  };

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnrole">
        <Side role={user.role} />
        {user.role === "admin" && (
          <div className="Sect2role">
            <div className="uprole">
              <div className="uprole1">
                <div className="form-group">
                  <label htmlFor="firstName" className="input">
                    Role name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input1"
                    value={rolename}
                    onChange={(e) => setRolename(e.target.value)}
                  />
                </div>
                <div className="permissions">
                  <h3>Permissions:</h3>
                  {allPermissions.map((permission, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(
                            permission.pername
                          )}
                          onChange={() => handlePermissionChange(permission)}
                        />
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="create-list">
                  <Link className="btn-create-usr" onClick={handleSubmit}>
                    create role
                  </Link>
                  <Link to="/permissions-management" className="btn-create-usr">
                    Permissions
                  </Link>
                </div>
              </div>
              <Baarr />
            </div>
            <div className="downrole">
              <Perm pername={selectedPermissions.pername} />
              <div className="additional-permissions">
                {permissions
                  .filter(
                    (permission) => !selectedPermissions.includes(permission)
                  )
                  .map((permission, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => handlePermissionChange(permission)}
                        />

                        {permission}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditRole;
