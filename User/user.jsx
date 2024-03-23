import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './user.css';

function User(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      props.onDelete(props.username); // Appel de la fonction onDelete avec le nom d'utilisateur à supprimer
    }
  };

  return (
    <div className='usr'>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <div className='un'>{props.username}</div>
      <div className='e'>{props.email}</div>
      <div className='status'>{props.status}</div>
      <Link to="/view" className='v'>View </Link>
      <button onClick={handleDelete} className='d'>Delete</button> {/* Bouton pour supprimer l'utilisateur */}
    </div>
  );
}

export default User;
