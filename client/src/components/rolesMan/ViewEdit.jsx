import React, { useState } from 'react';
import './createRole.css';
import PermissionsModal from './PermissionsModal';
import Perdata from '../permissionsMan/dataper'; // Import des données de la base de données des permissions


function Edit({  onClose , onUpdate }) {
    
    const [selectedRole, setselectedRole] = useState(JSON.parse(localStorage.getItem('selectedRole')));
    const [rolename, setRolename] = useState(selectedRole.name);
    const [selectedPermissions, setSelectedPermissions] = useState(selectedRole.permissions);
    const [allPermissions] = useState(Perdata); // Données de la base de données des permissions
   
     const [showPermissionsModal, setShowPermissionsModal] = useState(false);

     const handleAddPermissions = (permissions) => {
    setSelectedPermissions(permissions);
    setShowPermissionsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
      };

  const handleEditRole = (event) => {
    event.preventDefault();

    if (!rolename) {
      alert('Please enter a role name!');
      return;
    }

    if (selectedPermissions.length === 0) {
      alert('Please select at least one permission!');
      return;
    }


    const isConfirmed = window.confirm("Are you sure you want to save the changes?");
    if (isConfirmed) {
      const updatedRole = {
        ...selectedRole,
        name : rolename ,
        permissions : selectedPermissions  } ; 
     
    localStorage.setItem('user role ', JSON.stringify(updatedRole));
    console.log(' updatedUser', updatedRole)
    localStorage.setItem('selectedUser', JSON.stringify(updatedRole));
    alert("Information updated successfully");
    setselectedRole(updatedRole); 
    onUpdate(updatedRole);
    setRolename('');
    setSelectedPermissions([]);
    onClose();
  };}

  return (
    <form className="create-role-form"  style={{ display: "flex"  , flexDirection :'column',alignItems :"center", justifyContent :'center'}} >
    
      <div className="title1">Edit Role</div>
      <div className="form-group-create-role" >
        <label htmlFor="rolenam" className='input'>Role name</label>
        <div className="input1">
        <input type="text" id="rolenam" name="rolenam" className='input1' value={rolename} onChange={(e) => setRolename(e.target.value)} 
           style={{
            height :'40px' ,
            border :'none',
            width :'200px'
         
          }}
        required />
            </div>
        <label htmlFor="Permissions" className="input">Permissions:</label>

        <div >
           <button className="input1" type="button" onClick={() => setShowPermissionsModal(true)} style={{backgroundColor :'white'}}>Choose Permissions</button>
        </div>


        

        {showPermissionsModal && (
          <PermissionsModal
            Permissions={allPermissions}
            selectedPermissions={selectedPermissions}
            onClose={() => setShowPermissionsModal(false)}
            onAddPermissions={handleAddPermissions}
          />
        )}

        <div className='btns'>
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>
          <button type="submit" onClick={handleEditRole} className='create btn'>Edit Role</button>
        </div>
      </div>
    </form>
  );
}

export default Edit ;
