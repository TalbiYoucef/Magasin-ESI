import React, { useState } from "react";

import { Link } from 'react-router-dom';
import Roledata from '../CommandManagement/commandData.jsx';

function Rollig(props) {
    const [isChecked, setIsChecked] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedCommand, setSelectedCommand] = useState(null); // État local pour stocker les données de la commande sélectionnée

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleDelete = () => {
        setIsVisible(false);
        console.log("cha");
    };

    //-------------------------
    const handleViewClick = (numCmd) => {
      console.log("Numéro de commande:", numCmd);
      const cmdinfos = Roledata.find(command => command.numCmd === numCmd);
      console.log('Informations cmd:', cmdinfos);
      setSelectedCommand(cmdinfos);
      if (cmdinfos) {
          localStorage.setItem('selectedCommand', JSON.stringify(cmdinfos));
          console.log('Commande sélectionnée stockée dans le stockage local.');
          // Rediriger vers la page où vous souhaitez afficher les détails de la commande
          // window.location.href = "/CommandDetails";
      } else {
          console.log("Aucune commande trouvée avec ce numéro.");
      }
  };

  //------------------
  const handleEditClick = (numCmd) => {
    console.log("Numéro de commande:", numCmd);
    const cmdinfos = Roledata.find(command => command.numCmd === numCmd);
    console.log('Informations cmd:', cmdinfos);
    if (cmdinfos) {
        localStorage.setItem('selectedCommand', JSON.stringify(cmdinfos));
        console.log('Commande sélectionnée stockée dans le stockage local.');
        // Rediriger vers la page où vous souhaitez afficher les détails de la commande
        // window.location.href = "/CommandEdit";
    } else {
        console.log("Aucune commande trouvée avec ce numéro.");
    }
};
  

    return (
        <div>
            {isVisible && (
                <div  style={{
                    width: '90%',
                    height: '5px',
                    display: 'flex',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    marginTop: '10px',
                    padding: '20px',
                    gap: '60px'
                  }}>
                    <input type="checkbox"  style={{marginLeft:'-110px',width:'38%'}} checked={isChecked} onChange={handleCheckboxChange} />
                    <div style={{display:'flex',gap:'70px',width:'100%'}}>
                    <p  style={{fontSize: '15px',width:'20%',color: 'rgba(58, 53, 65, 0.87)',marginTop:'10px'}}>{props.id}</p>

                    
                    <p  style={{width:'30%',textAlign:'center',fontSize: '15px',width:'200px',color: 'rgba(58, 53, 65, 0.87)',marginTop:'10px'}}>{props.date}</p>
                    </div>
                    <a href=""   style={{marginLeft:'50px',textDecoration: 'none',color:'blue'}} onClick={() => handleViewClick(props.numCmd)}>View</a>
                    <a href=""  style={{textDecoration: 'none',
  marginLeft: '20px',
  width: '100px',
  color: '#FA9E15'}} onClick={() => handleEditClick(props.numCmd)}>Edit</a>
                    <button style={{textDecoration: 'none',
  width: '100px',
  marginRight: '50px',
  color: '#D42803',
  backgroundColor: 'white',
  border: 'none',
  fontSize: '18px'}} onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Rollig;