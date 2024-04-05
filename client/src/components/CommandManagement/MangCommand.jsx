import React, { useEffect, useState } from 'react';
import './MangCommand.css';
import Side from './sidcmd.jsx'
import Nav from '../usersprofil/nav.jsx'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import CmdData from './commandData.jsx'
import Per from './commandLign.jsx'

import { Link } from 'react-router-dom';


function Cmds(){
  const [cmds, setcmds] = useState(CmdData); // État local pour stocker la liste des command
  const [isChecked, setIsChecked] = useState(false); // État local pour le bouton de case à cocher
  const [sortOrder, setSortOrder] = useState('asc'); // État local pour l'ordre de tri (ascendant ou descendant)
  const [selectedState, setSelectedState] = useState("State");
  const [selectedCommand, setSelectedCommand] = useState(null); 

  
  useEffect(() => {
    const storedCommand = JSON.parse(localStorage.getItem("selectedCommand"));
    setSelectedCommand(storedCommand);
  }, []);



  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Gérer les changements de la valeur de recherche
  const [searchTerm, setSearchTerm] = useState(''); // État local pour stocker la valeur de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les cmd en fonction de la valeur de recherche
  const filteredCmd = cmds.filter(cmd =>
    cmd.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.numCmd.toLowerCase().includes(searchTerm.toLowerCase())
   
  );
// filtrer les dates 

const handleSortClick = () => {
  const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  setSortOrder(newOrder);
  setcmds([...cmds].sort((a, b) => {
    if (newOrder === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  }));
};
  //filtre les states
 // Fonction pour filtrer les commandes par état sélectionné
 const handleStateFilter = (state) => {
  setSelectedState(state);
  const filteredCommands = CmdData.filter(cmd => {
    if (state === null || state==='State') {
      return true; // Si aucun état n'est sélectionné, affiche toutes les commandes
    } else {
      return cmd.state === state;
    }
  });
  setcmds(filteredCommands);
};


    
  return(
    <div className="container">
      <div className="row">
        <nav className="col-md-12 bordureOrange nav">
          <Nav/>
        </nav>
      </div>
      <div className="row">
        <section className="col-md-12 bordureBleue">
          <div className="col-md-5 bordureBleue section-128"> 
            <Side/>
          </div>
          <div className="col-md-5 bordureBleue section-28"> 
            <div className='fot28'>
              <div className='search28'>
                <IoSearchOutline /> <input type="text" placeholder='search command / supplier' value={searchTerm} onChange={handleSearchChange} />
              </div>
               <div className='cre28'>
              <button >create command</button>
            </div> 
            </div>
            <div className='permi28'>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className='roleinp28'/> 
              <p className='roles28'>N° Commande </p>
              <p className='supp28'>supplier</p>
              <p className='datte28'><p className='eleDate28'>Date</p><button onClick={handleSortClick} className='btndate28'><MdOutlineKeyboardArrowDown/></button></p>
              <p className='stta28'>
               <select className='selctstat28' value={selectedState} onChange={(event) => setSelectedState(event.target.value)} onClick={() => handleStateFilter(selectedState)} >
                 <option value="State">State</option>
                 <option value="initialized">initialized</option>
                 <option value="validated">validated</option>
                 <option value="partially">partially</option>
                 <option value="processed">processed</option>
                 <option value="cancelled">cancelled</option>
               

        {/* Ajoutez d'autres options au besoin */}
      </select>
             
              </p>
              
            </div>
            <div>
              {
                filteredCmd.map((cmd, index) => (
                  <Per key={index} numCmd={cmd.numCmd} supplier={cmd.supplier} date={cmd.date} state={cmd.state}/>
                ))
              }
            </div>   
            
           
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cmds;
