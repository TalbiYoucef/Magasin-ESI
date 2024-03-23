import React, { useState } from 'react';
import './users.css';
import Side from '../side/side';
import Nav from '../nav/nav';
import UserData from '../data/data';
import servicesData from '../data/service';
import User from '../User/user';
import Bar from '../User/bar';
import { BsSearch } from "react-icons/bs";
import CreateUserForm from  '../createuser/createuser'; 

function Users() {
  const [searchTerm, setSearchTerm] = useState(''); // État local pour stocker la valeur de recherche
  const [users, setUsers] = useState(UserData); // État local pour stocker la liste des utilisateurs
  const [showCreateUserForm, setShowCreateUserForm] = useState(false); // État local pour contrôler l'affichage du formulaire de création d'utilisateur

  // Fonction pour créer un nouvel utilisateur


  const handleCreateUser = (newUser) => {
    // Ajouter le nouvel utilisateur à la liste des utilisateurs
    setUsers([...users, newUser]);
    // Masquer le formulaire de création d'utilisateur après la création
    setShowCreateUserForm(false);
  };

  // Fonction pour basculer l'affichage du formulaire de création d'utilisateur
  const toggleCreateUserForm = () => {
    setShowCreateUserForm(!showCreateUserForm);
  };

  // Filtrer les utilisateurs en fonction de la valeur de recherche
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = (username) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.username !== username); // Filtrer les utilisateurs pour supprimer celui avec le nom d'utilisateur donné
      setUsers(updatedUsers); // Mettre à jour la liste des utilisateurs
    }
  };

  // Gérer les changements de la valeur de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  

  return (
    <div>
      <Nav/>
      <section>
      <Side  /> 
      <div className="col-md-5 Body">
      <div className='nvv'>
        <div className='nv'>
          <div className='Search'>
            <BsSearch className='search-icon' />
            <input  
              type="text" 
              className='search-input' 
              placeholder="Search user"
              value={searchTerm}
              onChange={handleSearchChange} 
            />
          </div>
          <button onClick={toggleCreateUserForm} className='btn-create-usr'>Create User</button>
        </div>
        <Bar /> 
        </div>
        <div className='nvvv'>

        {filteredUsers.map((user) => (
          <User
            key={user.username}
            username={user.username}
            email={user.email}
            status={user.status}
            onDelete={handleDeleteUser} 
          />
        ))}
      </div>
      </div>

      {/* Afficher le formulaire de création d'utilisateur comme une fenêtre modale */}
      {showCreateUserForm && (
        <div className="modal-overlay-create">
          <div className="modal-content-create">
          <CreateUserForm servicesData={servicesData} onCreateUser={handleCreateUser} 
          onClose={() => setShowCreateUserForm(false) }/>

          </div>
        </div>
      )}
      </section>
    </div>
  );
}

export default Users;
