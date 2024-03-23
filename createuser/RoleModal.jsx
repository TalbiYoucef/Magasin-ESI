import React, { useState } from 'react';
import './role.css';

function RoleModal({ service, roles, onClose, onAddRoles }) {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isRoleSelected, setIsRoleSelected] = useState(false);

  const handleSelectRole = (role) => {
    const updatedSelectedRoles = [...selectedRoles];
    if (!updatedSelectedRoles.includes(role)) {
      updatedSelectedRoles.push(role);
    } else {
      const index = updatedSelectedRoles.indexOf(role);
      updatedSelectedRoles.splice(index, 1);
    }
    setSelectedRoles(updatedSelectedRoles);
    setIsRoleSelected(updatedSelectedRoles.length > 0);
  };

  const handleAddRoles = () => {
    onAddRoles(selectedRoles);
    setSelectedRoles([]);
    setIsRoleSelected(false);
    onClose();
  };

  return (
    <div className="modal-list">
      <div className="modal-content-list">
        <h2 className='title'>Roles for {service}</h2>
        <ul className='role-list'>
          {roles.map(role => (
            <li key={role.id}>
              <label>
                <input
                  type="checkbox"
                  value={role.name}
                  onChange={() => handleSelectRole(role.name)}
                />
                {role.name}
              </label>
            </li>
          ))}
        </ul>

        <div className='btns'>      
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>  
          <button type="button" onClick={handleAddRoles} className='add btn' disabled={!isRoleSelected}>Add Role</button>
        </div>
      </div>
    </div>
  );
}

export default RoleModal;
