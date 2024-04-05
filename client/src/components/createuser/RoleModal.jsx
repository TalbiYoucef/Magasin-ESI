import React, { useState, useEffect } from 'react';
import './role.css';

function RoleModal({ roles, selectedRoles, onClose, onAddRoles }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selectedRoles);
  }, [selectedRoles]);

  const handleSelectRole = (roleName) => {
    const index = selected.indexOf(roleName);
    if (index === -1) {
      setSelected([...selected, roleName]);
    } else {
      setSelected(selected.filter(role => role !== roleName));
    }
  };

  const handleAddRoles = () => {
    onAddRoles(selected);
    onClose();
  };

  return (
    <div className="modal-list-roles">
      <div className="modal-content-list-roles">
        <h2 className='title'>Roles </h2>
        <ul className='role-model-list'>
       {roles.map(role => (
       <li key={role.id}>
      <label className="role-model-label">
        <input
          type="checkbox"
          value={role.name}
          checked={selected.includes(role.name)}
          onChange={() => handleSelectRole(role.name)}
        />
        <span className="role-model-name">{role.name}</span>
      </label>
    </li>
  ))}
</ul>

        <div className='btns-role-modal'>      
          <button type="button" onClick={onClose} className='cancel-role-modal btn-role-modal'>Cancel</button>  
          <button type="button" onClick={handleAddRoles} className='add-role-modal  btn-role-modal'>Add Role</button>
        </div>
      </div>
    </div>
  );
}

export default RoleModal;
