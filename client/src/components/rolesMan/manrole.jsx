import React, { useState, useEffect } from "react";
import "./manrole.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Per from "./rollig.jsx";
import CreateRoleForm from "./createRole.jsx";
import Edit from "./ViewEdit.jsx";
import Barr from "./barr.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Role() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [showCreateRoleForm, setShowCreateRoleForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [user, setUser] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [showEditRoleForm, setShowEditRoleForm] = useState(false);
  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        const accessToken = res.data.accessToken;
        setAccessToken(accessToken);
        try {
          const [rolesResp, permissionsResp] = await Promise.all([
            axios.get("http://localhost:3036/roles", {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }),
            axios.get("http://localhost:3036/permissions", {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }),
          ]);
          setRoles(rolesResp.data);
          setPermissions(permissionsResp.data);
        } catch (error) {
          navigate("/dashboard");
          console.error("An error occurred:", error);
        }
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateRole = async (newRole) => {
    // Implement role creation logic
    setSelectedPermissions([]);
    setRoles([
      ...roles,
      {
        id: roles.length.toString(),
        name: newRole.rolename,
        permissions: newRole.selectedPermissions,
      },
    ]);
    setSelectedPermissions(
      permissions
        .filter((per) => newRole.selectedPermissions.includes(per.name))
        .map((per) => per.permission_id)
    );
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });

      const resp = await axios.post(
        "http://localhost:3036/roles",
        {
          name: newRole.rolename,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      console.log(resp);
      selectedPermissions.forEach(async (perm) => {
        await axios
          .put(
            `http://localhost:3036/roles/${resp.data.role_id}/permissions/`,
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
          })
          .catch((err) => {
            console.log(err);
          });
      });
      //resp.data.role_id
    } catch (error) {
      // navigate("/login");
      console.log(error);
    }

    setShowCreateRoleForm(false);
  };

  const handleViewRole = (id) => {
    const roleinfos = roles.filter((Role) => Role.role_id === id);
    console.log(roleinfos);
    setSelectedRole(roleinfos); // Stocker les informations du rôle sélectionné
    setShowEditRoleForm(true); // Afficher le formulaire d'édition
    // Implement logic to view role details
  };

  const handleUpdateRole = async (updatedRole) => {
    try {
      await axios
        .put(
          `http://localhost:3036/roles/${updatedRole.new.role_id}`,
          {
            name: updatedRole.name,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        )
        .then(async (resp) => {
          const selected = permissions
            .filter((per) => updatedRole.permissions.includes(per.name))
            .map((per) => per.permission_id);
          selected.forEach(async (element) => {
            await axios.put(
              `http://localhost:3036/roles/${updatedRole.new.role_id}/permissions`,
              {
                permission_id: element,
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
              }
            );
          });
        });
      window.location.reload();
    } catch (error) {
      alert("Could Not Update Role Name");
    }
  };
  const toggleCreateRoleForm = () => {
    setShowCreateRoleForm(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rolesList = filteredRoles.map((role, index) => (
    <Per
      id={role.role_id}
      key={index}
      roleName={role.name}
      onView={() => handleViewRole(role.role_id)}
    />
  ));

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnrole">
        <Side link="roles" />
        <div className="Sect2role">
          <div className="uprole">
            <div className="uprole1">
              <div className="Search">
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="search role"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              <div className="create-list">
                <Link onClick={toggleCreateRoleForm} className="btn-create-usr">
                  create role
                </Link>
                <Link to="/permissions-management" className="btn-create-usr">
                  Permissions <MdNavigateNext />
                </Link>
              </div>
            </div>
            <Barr />
          </div>
          <div className="downrole">{rolesList}</div>
        </div>
      </div>
      {showCreateRoleForm && (
        <div className="modal-overlay-create-role">
          <div className="modal-content-create-role">
            <CreateRoleForm
              onCreateRole={handleCreateRole}
              onClose={() => setShowCreateRoleForm(false)}
            />
          </div>
        </div>
      )}
      {selectedRole && (
        <div className="modal-overlay-create-role">
          <div className="modal-content-create-role">
            <Edit
              role={selectedRole}
              onClose={() => setSelectedRole(null)}
              onUpdate={handleUpdateRole}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Role;
