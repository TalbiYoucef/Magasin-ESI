import React, { useState } from "react";
import './commandLign.css';
import { Link } from 'react-router-dom';
import Roledata from './commandData.jsx';

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
                <div className='oper29'>
                    <input type="checkbox" className="check29" checked={isChecked} onChange={handleCheckboxChange} />
                    <p className="numCMD29">{props.numCmd}</p>
                    <p className="sup29">{props.supplier}</p>
                    <p className="dat29">{props.date}</p>
                    <p className="sta29">{props.state}</p>

                    <a href=""  className='view29' onClick={() => handleViewClick(props.numCmd)}>View</a>
                    <a href="" className='edi29' onClick={() => handleEditClick(props.numCmd)}>Edit</a>
                    <button className='del29' onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Rollig;
