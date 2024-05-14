import React, { useState } from 'react';
import './manChapitre.css';
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import produitData from '../data/chapitreData.jsx'; 
import Per from './chapitreLig.jsx';
import CreateRoleForm from './createChap.jsx';
//import Edit from './ViewEdit.jsx';
import Barr from './bar.jsx';
import { Link } from 'react-router-dom';

const username = "chahi";






function Chapitre() {
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEditRoleForm, setShowEditRoleForm] = useState(false);
  const [user,setuser] = useState(username);
  const [chapitres, setChapitres] = useState(produitData);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);

  

  const handleViewRole = (Rolename) => {
    const roleinfos = produitData.find(Role => Role.name === Rolename);
    setSelectedRole(roleinfos); // Stocker les informations du rôle sélectionné
    setShowEditRoleForm(true); // Afficher le formulaire d'édition
    
  };


  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = produitData.filter(chapitre =>
    chapitre.chapitre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

  const rolesList = filteredRoles.map((chapitre, index) => (
    <Per key={index} rolenam={chapitre.chapitre} onView={() => handleViewRole(chapitre.chapitre)} />
  ));

  const handleCreateChapitre = (newChapitre) => {
    const updatedChapitres = [...chapitres, newChapitre];
    setChapitres(updatedChapitres);
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
                    placeholder='search Chapitre'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='search-input'
                    style={{border :'none',height: '30px', width:'120px' }}

                  />
                </div>
                <div className='create-list'>
                  <Link onClick={toggleCreateChapitreForm} className='btn-create-usr'>Create Chapitre</Link>
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
        <div className="modal-overlay-create-role">
          <div className="modal-content-create-role">
          <CreateRoleForm onCreateChapitre={handleCreateChapitre} onClose={() => setShowCreateChapitreForm(false)} />

          </div>
        </div>
      )}
      

    </div>
  );
}

export default Chapitre;
