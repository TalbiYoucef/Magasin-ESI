import React, { useState , useEffect } from 'react';
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import PerLine from './PerLine.jsx';
import Barrr from '../permissionsMan/barrr.jsx';
import PermissionsModal from '../rolesMan/PermissionsModal';
import PermissionData from '../permissionsMan/dataper';


function ViewRole() {

    const [user ,setuser] =useState({
        id: '0', 
      username: 'hafsa Aouaichia', 
      photo: '../../assets/logo.png', 
      password: '267517',    
      firstname: 'Hafsa', 
      lastname: 'Aouaichia', 
      address: 'El Matmar, Relizane', 
      phone: '+213 0553454437', 
      email: 'h.aouaichia@esi-sba.dz', 
      status: 'enable', 
      role : 'Administrator',
      roles: ['Director', 'Administrator', 'Storekeeper'],  
    }) 

    const [RoleData, setRoleData] = useState({
        id: '0',
        name: 'Director' ,
        permissions: ['Create user' , 'Edit user informations'],
      }); 

      const [Role, setRole] = useState(RoleData);

 console.log('RoleData//role name',RoleData)  ;

   const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState(Role.permissions);
 

  const rolesList = Role.permissions.map((role, index) => (
    <PerLine key={index} rolenam={role}   /> // Passer la fonction handleViewRole comme prop
  ));


  const handleAddPermissions = (permissions) => {
    setSelectedPermissions(permissions);
    setShowPermissionsModal(false); // Fermer le modal des permissions une fois les permissions sélectionnées
  };
  
  useEffect(() => {
    setRole({ ...Role, permissions: selectedPermissions });
  }, [selectedPermissions]); 

  


  const handleConfirm = () => {
    const confirm = window.confirm("Are you sure you want to Confirm the Role?");
    if (confirm) {
        setRoleData({
            id: Role.id,
            name: Role.name,
            permissions : Role.permissions
           
        })

    };
    window.location.href = '/RolesManagement'; 

}



  return (
    <div>
      <Nav username={user.username} />
      <div style={{display:'flex' ,height  :'92vh' }}>
        <Side  link="roles" />
          <div
          style={{
            width: '85%' ,
            marginLeft: '10%' ,
            marginTop:' 8vh'
          }}
          >
            <div 
            style={{
                position: 'fixed' ,
                height: '22vh' , 
                backgroundColor: 'white' ,
                width: '85%'
            }}
            
            >
              <div 
              style={{
                display: 'flex' ,
                alignItems: 'center' ,
            justifyContent:' space-between ',
              }}
              
              >
                <div style={{display:'flex' , flexDirection :'column' , marginTop:'20px'}}>
                    <div style={{  marginLeft: '60px'   ,    color: '#616262' ,fontSize:'14px'}}> Role name </div>
                <div
                
                style={{
                    display: 'flex' ,
                    alignItems: 'center' ,
                    width: '280px' ,
                    height: '40px' ,
                    borderRadius: '20px' ,
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    padding: '20px ' ,
                    color: '#616262' ,
                    marginLeft: '40px' , 

                }}
                >
                 
                  <input
                    type="text"
                    placeholder={Role.name}
                    onChange={(e) => setRole({ ...Role, name: e.target.value })}
                    style={{border :'none',height: '30px' }}
                  />
                </div>
                </div>
                <div 
                style={{

                    display: 'flex' ,
                    gap : '20px'  ,
                    marginRight : '40px' , 
                }}
                
                >
                <button  
                 style={{
                    textDecoration: 'none',
                    width: '140px',
                    height: '40px',
                    borderRadius: '30px',
                    marginTop: '30px',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '500', // medium
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                    textAlign: 'center' ,
                    backgroundColor :'#0047FF' , 
                    boxShadow :"none"  ,
                    border:'none' , 
                    color :'white'
                  }}
                  
                type="button" onClick={() => setShowPermissionsModal(true)} >Add Permissions</button>


                 
<button
    style={{
        textDecoration: 'none',
        width: '140px',
        height: '40px',
        borderRadius: '30px',
        marginTop: '30px',
       
        transition: 'border-color 0.3s ease',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '500', // medium
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        textAlign: 'center' ,
        backgroundColor :'#FA9E15' , 
        boxShadow :"none"  ,
        border:'none' , 
        color :'white'
      }}
    onClick={handleConfirm}> Roles  List </button>


{showPermissionsModal && (
  <PermissionsModal
    Permissions={PermissionData}
    selectedPermissions={selectedPermissions}
    onClose={() => setShowPermissionsModal(false)}
    onAddPermissions={handleAddPermissions}
  />
)}
                </div>
              </div>
              <Barrr />
            </div>
            <div
            style={{
                paddingtop: '20px' ,
                marginTop:'30vh' ,
                width:  '85%' ,
                marginLeft: '20px' ,
            }}
            
            >
              {rolesList}
            </div>
          </div>
       
      </div>
     
      

    </div>
  );
}

export default ViewRole;
