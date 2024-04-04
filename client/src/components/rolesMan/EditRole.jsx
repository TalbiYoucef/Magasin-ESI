import Perm from '../permissionsMan/perm';
import Perdata from '../permissionsMan/dataper'; // Import des données de la base de données des permissions
import React, { useState } from 'react';
import Side from '../side/side';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';
import Baarr from './baarrr';

function EditRole() {
  const selectedRole = JSON.parse(localStorage.getItem('selectedRole'));
  const [rolename, setRolename] = useState(selectedRole.name);
  const [selectedPermissions, setSelectedPermissions] = useState(selectedRole.permissions);
  const [allPermissions] = useState(Perdata); // Données de la base de données des permissions

  const handlePermissionChange = (permission) => {
    const isChecked = selectedPermissions.includes(permission);
    if (isChecked) {
      setSelectedPermissions(selectedPermissions.filter(perm => perm !== permission));
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
    const isConfirmed = window.confirm("Are you sure you want to save the changes?");
    if (isConfirmed) {
      const updatedRole = {
        ...selectedRole,
        name: rolename,
        permissions: selectedPermissions
      };
      localStorage.setItem('selectedUser', JSON.stringify(updatedRole));
      alert("Information updated successfully");
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Nav username={user.username} />
      <div className='dwnrole'>
        <Side role={user.role} />
        {user.role === 'admin' && (
          <div className="Sect2role">
            <div className='uprole'>
              <div className='uprole1'>
                <div className="form-group">
                  <label htmlFor="firstName" className="input">Role name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="input1"
                    value={rolename}
                    onChange={(e) => setRolename(e.target.value)}
                  />
                </div>
                <div className='permissions'>
                  <h3>Permissions:</h3>
                  {allPermissions.map((permission, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.pername)}
                          onChange={() => handlePermissionChange(permission)}
                        />
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
                <div className='create-list'>
                  <Link className='btn-create-usr' onClick={handleSubmit}>create role</Link>
                  <Link to='/permissions-management' className='btn-create-usr'>Permissions</Link>
                </div>
              </div>
              <Baarr />
            </div>
            <div className='downrole'>
              <Perm pername={selectedPermissions.pername} />
              <div className='additional-permissions'>
                {allPermissions.filter(permission => !selectedPermissions.includes(permission)).map((permission, index) => (
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
