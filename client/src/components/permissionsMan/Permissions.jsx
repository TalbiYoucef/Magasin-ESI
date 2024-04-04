import React , { useState } from 'react';
import './role.css';
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import { BsSearch } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import Per from './perm.jsx'
import { Link } from 'react-router-dom';
import Barrr from './barrr.jsx';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Permissions(){
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
          navigate('/dashboard')
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

 //checkbox
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  //parcour data
  const pers = permissions.map(
    per => {
     return <Per pername={per.name}/>
    })
    //search------------------------------
    const [searchTerm, setSearchTerm] = useState(''); // État local pour stocker la valeur de recherche

    // Filtrer les permissions en fonction de la valeur de recherche
    const filteredPer = permissions.filter(per =>
      per.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  
    const perms = filteredPer.map((per, index) => {
      return <Per key={index} pername={per.name}  />;
    });
  
    // Gérer les changements de la valeur de recherche
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };


    
  
    return(
      <div>
      <Nav  username={user.username} />
      <div className='dwnrole' >
      <Side    link='roles'/>
      
                
        <div className=" Sect2role" >
          <div className='uprole'>
            <div className='uprole1'>
              <div className='Search'>
                <BsSearch className='search-icon' />
                 <input type="text" placeholder='Search '  value={searchTerm}  onChange={handleSearchChange}
                style={{  border :'none' , outline : 'none ' , height :'30px' }}
                 />
              </div>
              <div className='create-list'>
              <Link to='/roles' className='btn-create-usr'> Roles list <MdNavigateNext /></Link>
             </div>
             </div>
               <Barrr />
          </div>
                    <div className='downrole'>
                      {
                          filteredPer.map((per) => (
                            <Per pername={per.name}/>
                          ))
                        }
                </div>
        </div>
                
        </div>
        </div>
    )}














     
       
  

export default Permissions;