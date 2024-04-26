import React, { useState } from 'react';
import './manProduits.css';
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import produitData from '../data/chapitreData.jsx'; //chapitre data
import article from '../data/Articles.jsx'; //article data
import produit from '../data/Produit.jsx'; //Produit data

import Per from './produitLig.jsx';
import CreateRoleForm from './createProduit.jsx';
//import Edit from './ViewEdit.jsx';
import Barr from './barProduit.jsx';
import { Link } from 'react-router-dom';

const username = "chahi";






function Produit() {
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEditRoleForm, setShowEditRoleForm] = useState(false);
  const [user,setuser] = useState(username);
  const [produits, setProduits] = useState(produit);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);

  


  const handleViewRole = (produitName) => {
    const articleInfo = article.find(article => article.name === produitName);
    setSelectedRole(articleInfo); // Stocker les informations de l'article sélectionné
    setShowEditRoleForm(true); // Afficher le formulaire d'édition
  };


  

 /* const handleUpdateRole = (updatedRole) => {
    const updatedRoles = roles.map(role => {
      if (role.id === updatedRole.id) {
        return updatedRole;
      }
      return role;
    });
    setRoles(updatedRoles); // Mettre à jour la liste des rôles avec le rôle mis à jour
  };*/

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = produit.filter(article =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

  //---------------------------------------------
 





  // Ajoutez ceci pour afficher les nouveaux articles créés

  const rolesList = filteredRoles.map((produit, index) => (
    <Per key={index} name={produit.name} onView={() => handleViewRole(produit.name)} />
  ));

  const handleCreateChapitre = (newChapitre) => {
    const updatedChapitres = [...produits, newChapitre];
    setProduits(updatedChapitres);
    setShowCreateChapitreForm(false); // Masquer le formulaire de création de chapitre après création réussie
  };


  const toggleCreateChapitreForm = () => {
    setShowCreateChapitreForm(!showCreateChapitreForm);
  };

  
  
  return (
    <div>
      <Nav username={user.username} />
      <div className='dwnrole'>
        <Side className='siddd' link="roles" />
          <div className="Sect2role">
            <div className='upchap'>
              <div className='uprole1'>
                <div className='Search'>
                  <BsSearch className='search-icon' />
                  <input
                    type="search"
                    placeholder='search Produit'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='search-input'
                    style={{border :'none',height: '30px', width:'120px' }}

                  />
                </div>
                <div className='create-list'>
                  <Link onClick={toggleCreateChapitreForm} className='btn-create-usr'>Create Produit</Link>
                  <Link to='/permissions-management' className='btn-create-usr1'> Articles List  <MdNavigateNext /></Link>
                </div>
              </div>
              <Barr />
            </div>
            <div className='downchap'
                  >
              {rolesList}
              
              
              

            </div>
          </div>
       
      </div>
      {showCreateChapitreForm && (
        <div className="modal-overlay-create-role" >
          <div className="modal-content"  style={{height :'500px', width:'700px',marginTop:'200px'}}>
          <CreateRoleForm onCreateChapitre={handleCreateChapitre} onClose={() => setShowCreateChapitreForm(false)} />

          </div>
        </div>
      )}
      

    </div>
  );
}

export default Produit;
