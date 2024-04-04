import React, { useState, useEffect } from 'react';
import './PermissionsModal.css';

function PermissionsModal({ Permissions, selectedPermissions, onClose, onAddPermissions }) {
  const [selected, setSelected] = useState([...selectedPermissions]); // Utilisez le spread operator pour créer une copie de selectedPermissions

  const handleSelectPermissions = (PermissionsName) => {
    const index = selected.indexOf(PermissionsName);
    if (index === -1) {
      setSelected([...selected, PermissionsName]);
    } else {
      setSelected(selected.filter(permission => permission !== PermissionsName));
    }
  };

  const handleAddPermissions = () => {
    if (selected.length === 0) {
      alert('Please select at least one permission!');
      return;
    }
    onAddPermissions(selected);
    onClose();
  };

  return (

    <div className="modal-list-roles">
    <div className="modal-content-list-roles" style={{overflowY : 'scroll'}}>
      <h2 className='title'>Permissions </h2>
      <ul className='role-model-list'>
      {Permissions.map(permission => (
            <li key={permission.id}>
    <label className="role-model-label">
    <input
                  type="checkbox"
                  value={permission.name}
                  checked={selected.includes(permission.name)}
                  onChange={() => handleSelectPermissions(permission.name)}
                />
      <span className="role-model-name">     {permission.name}</span>
    </label>
  </li>
))}
</ul>
<div className='btns'>      
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>  
          <button type="button"   onClick={handleAddPermissions} className="create btn">Add Permissions</button>
        </div>
    
    </div>
  </div>













    

      
  );
}

export default PermissionsModal;
