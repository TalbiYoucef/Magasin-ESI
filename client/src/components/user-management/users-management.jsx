import React, { useEffect, useState } from "react";
import "./users.css";
import Side from "../side/side";
import Nav from "../nav/nav";
import User from "../User/user";
import Bar from "../User/bar";
import { BsSearch } from "react-icons/bs";
import CreateUserForm from "../createuser/createuser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Users() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAdmin(res.data.admin);
        try {
          const resp = await axios.get("http://localhost:3036/users", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          console.log(resp.data);
          setUsers(resp.data);
        } catch (error) {
          console.log(error);
          navigate("/dashboard");
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [searchTerm, setSearchTerm] = useState(""); // État local pour stocker la valeur de recherche
  const [users, setUsers] = useState([]); // État local pour stocker la liste des utilisateurs
  const [showCreateUserForm, setShowCreateUserForm] = useState(false); // État local pour contrôler l'affichage du formulaire de création d'utilisateur
  // Fonction pour créer un nouvel utilisateur
  const handleCreateUser = async (newUser) => {
    // Ajouter le nouvel utilisateur à la liste des utilisateurs

    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.post(
          "http://localhost:3036/auth/register",
          {
            username: newUser.userData.username,
            firstname: newUser.userData.firstName,
            lastname: newUser.userData.lastName,
            email: newUser.userData.email,
            phone_num: newUser.userData.phone,
            password: newUser.userData.password,
            status: "active",
            address: newUser.userData.address,
            service_id: newUser.serviceId,
          },
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setUsers([...users, resp.data.user]);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
    // Masquer le formulaire de création d'utilisateur après la création
    setShowCreateUserForm(false);
  };

  // Fonction pour basculer l'affichage du formulaire de création d'utilisateur
  const toggleCreateUserForm = () => {
    setShowCreateUserForm(true);
  };

  // Filtrer les utilisateurs en fonction de la valeur de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer les changements de la valeur de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side link="users" />

        <div className=" Sect2users">
          <div className="upusers">
            <div className="upusers1">
              <div className="Search">
                <BsSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search user"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ border: "none", height: "30px" }}
                />
              </div>
              <button onClick={toggleCreateUserForm} className="btn-create-usr">
                Create user
              </button>
            </div>
            <Bar />
          </div>
          <div className="downusers">
            {filteredUsers.map((user) => (
              <User
                key={user.user_id}
                username={user.username}
                email={user.email}
                status={user.status}
                id={user.user_id}
              />
            ))}
          </div>
        </div>

        {/* Afficher le formulaire de création d'utilisateur comme une fenêtre modale */}
        {showCreateUserForm && (
          <div className="modal-overlay-create-user">
            <div className="modal-content-create-user">
              <CreateUserForm
                onCreateUser={handleCreateUser}
                onClose={() => setShowCreateUserForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
