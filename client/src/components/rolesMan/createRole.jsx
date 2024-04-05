import React, { useState } from 'react';
import './createRole.css';
import PermissionsModal from './PermissionsModal';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';
function CreateRoleForm({ onCreateRole, onClose }) {
  const navigate = useNavigate()
  const [permissions,setPermissions] = useState([])
  const [user,setUser] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user);
        try {
          const resp = await axios.get("http://localhost:3036/permissions", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });

          setPermissions(resp.data)
          console.log(resp.data)
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [rolename, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const handleAddPermissions = (permissions) => {
    setSelectedPermissions(permissions);
    setShowPermissionsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };

  const handleCreateRole = (event) => {
    event.preventDefault();

    if (!rolename) {
      alert('Please enter a role name!');
      return;
    }

    if (selectedPermissions.length === 0) {
      alert('Please select at least one permission!');
      return;
    }

    onCreateRole({ rolename, selectedPermissions });
    setRoleName('');
    setSelectedPermissions([]);
    onClose();
  };

  return (
    <form className="create-role-form" style={{ display: "flex"  , flexDirection :'column',alignItems :"center", justifyContent :'center'}} >
      <div className="title1">Create Role</div>
      <div className="form-group-create-role" >
        <label htmlFor="Permissions" className="input">Role name:</label>
        <input  id="rolenam" name="rolenam"  value={rolename} onChange={(e) => setRoleName(e.target.value)} 
         style={{
           height :'40px' ,
           border :'none',
           boxShadow :'none',
           width :'250px' ,
      
         }}
        required />

        
        <label htmlFor="Permissions" className="input">Permissions:</label>
           <button  className="input1" type="button" onClick={() => setShowPermissionsModal(true)} style={{backgroundColor :'white' , textDecoration :"none " , boxShadow :"none" }}>Choose Permissions</button>

        {showPermissionsModal && (
          <PermissionsModal
            Permissions={permissions}
            selectedPermissions={selectedPermissions}
            onClose={() => setShowPermissionsModal(false)}
            onAddPermissions={handleAddPermissions}
          />
        )}

        <div className='btns'>
          <button type="button" onClick={onClose} className='cancel btn'>Cancel</button>
          <button type="submit" onClick={handleCreateRole} className='create btn'>Create Role</button>
        </div>
      </div>
    </form>
  );
}

export default CreateRoleForm;
