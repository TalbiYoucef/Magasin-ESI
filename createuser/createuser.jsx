// CreateUserForm.jsx
import React, { useState } from 'react';
import RoleModal from './RoleModal';
import './createUser.css';

function CreateUserForm({ onCreateUser, servicesData, onClose }) {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    status: 'enable',
    address: '',
    password: '',
    selectedService: '',
    selectedRoles: [],
  });
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [message, setMessage] = useState('');


  
  const handleAddRoles = (selectedRoles) => {
    setUserData({
      ...userData,
      selectedRoles,
    });

    

    setShowRoleModal(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setUserData({
      ...userData,
      selectedService,
    });
  };
 

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( userData.selectedRoles.length === 0) {
      alert('Please fill in all fields and select at least one role!');
      return;
    }
   
  onCreateUser(userData);
  setMessage('User created successfully');
  alert('User created successfully');

    setUserData({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      status: 'enable',
      address: '',
      password: '',
      selectedService: '',
      selectedRoles: [],
    });
  };

 

  const toggleRoleModal = () => {
    setShowRoleModal(!showRoleModal);
  };

  return (
    <form onSubmit={handleSubmit} className="create-user-form">
       <div className="title1">Create User </div>
       <div className="form-row"> 
       <div className="form-group">   <label htmlFor="username" className='input'>Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        className='input1'
        value={userData.username}
        onChange={handleChange}
        required
      />   </div>    
        <div className="form-group">   <label htmlFor="email" className='input'>Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        className='input1'

        value={userData.email}
        onChange={handleChange}
        required
      />   </div>   
     </div>
       <div className="form-row"> 
       <div className="form-group">      <label htmlFor="firstName" className='input'>First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        className='input1'
        value={userData.firstName}
        onChange={handleChange}
        required
      /></div>  
       <div className="form-group">    <label htmlFor="lastName" className='input'>Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        className='input1'
        value={userData.lastName}
        onChange={handleChange}
        required
      /> </div>  
    </div>

<div className="form-row">  

<div className="form-group">  <label htmlFor="phone" className='input'>Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        className='input1'
        value={userData.phone}
        onChange={handleChange}
        required
      />
      </div>  
      <div className="form-group">    <label htmlFor="address" className='input'>Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        className='input1'
        value={userData.address}
        onChange={handleChange}
        required
      /> </div>  
    
      
      </div>
     
      <div className="form-row"> 
      <div className="form-group">   <label htmlFor="status" className='input'>Status:</label>
      <select
        id="status"
        name="status"
        className='input1'
        value={userData.status}
        onChange={handleChange}
        required
      >
        <option value="">Select Status </option>
        <option value="enable">Enable</option>
        <option value="disable">Disable</option>
      </select></div>  
       
      <div className="form-group">   <label htmlFor="password" className='input'>Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        className='input1'
        value={userData.password}
        onChange={handleChange}
        minLength={8}
        required
      /> </div>  
    
      
       </div>
    
 
       <div className="form-row">
           <div className="form-group"> 
                      {/* Champ pour choisir le service */}
              <label htmlFor="service" className='input'>Service:</label>
      <select
        id="service"
        name="selectedService"
        value={userData.selectedService}
        className='input1'
        onChange={handleServiceChange}
        required
      >
        <option value="">Select service</option>
        {servicesData.map(service => (
          <option key={service.id} value={service.name}>{service.name}</option>
        ))}
      </select></div>  
    
      <div className="form-group">   
         {/* Bouton pour afficher la liste des rôles */}
         <label htmlFor="Roles" className='input'>Roles:</label>
              <button type="button" onClick={toggleRoleModal} className='input1'>Choose Roles</button>
  </div>  
  </div>

      {/* Afficher la fenêtre modale des rôles si un service est sélectionné */}
      {showRoleModal && userData.selectedService && (
        <RoleModal
          service={userData.selectedService}
          roles={servicesData.find(service => service.name === userData.selectedService).roles}
          onClose={() => setShowRoleModal(false)}
          onAddRoles={handleAddRoles}
        />
      )}
         

      <div className='btns'>      
        <button type="button"  onClick={onClose}   className='cancel btn'>Cancel</button>

        <button type="submit"  className='create btn'>Create User</button>
      </div>


      {/* Afficher le message */}
      {message && <div>{message}</div>}
    </form>
  );
}

export default CreateUserForm;
