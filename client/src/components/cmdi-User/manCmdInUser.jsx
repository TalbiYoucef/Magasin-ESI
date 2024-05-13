import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { BsSearch } from "react-icons/bs";
import produit from "../data/CommandInterne.jsx"; //command interne data
import Per from "./CmdLigUser.jsx";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";
import { MdOutlineQueryStats } from "react-icons/md";
import ViewProductStats from './ViewProductStats';


function CommandInterneUser() {
  const [user, setUser] = useState({});
  const [internals, setInternals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [TotalOrders , setTotalOrders] = useState('135');
  const [ProduitPlusConsommés, setProduitPlusConsommés] = useState('Papier');
  const [showProductStats, setshowProductStats] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/users/${res.data.user.user_id}/commands`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setInternals(resp.data.reverse());
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
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const handleSortClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const rolesList = internals.map((produit, index) => (
    <Per
      key={index}
      id={produit.command_id}
      date={String(produit.updatedAt).split("T")[0]}
    />
  ));

  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnrole">
        <Side className="siddd" link="roles" />
        <div
          style={{
            marginTop: "5vh",
            marginLeft: " 60px",
            width: "100%",
            height: "92vh",
            padding: "60px",
          }}
        >
          <div>
          <div style={{ display: 'flex',gap:'100px'}}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '350px', height: '40px', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', padding: '20px', color: '#616262', marginTop: '30px', marginLeft: '80px' }}>
                                <BsSearch style={{fontSize:'18px',marginRight:'5px'}} />
                                <input
                                    type="search"
                                    placeholder='search command'
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className='search-input'
                                    style={{ border: 'none', height: '30px', width: '150px' }}
                                />
                            </div>
                            <div style={{width:'100%',display:'flex' }}>
                            <div style={{width:'65%',height: '90px', gap:'30px',display:'flex' , marginleft :'80px' }}>
                            <div style={{padding:'12px',width:'50%' ,paddingTop:'20px',boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',borderRadius:'30px'}}>
                              <div style={{display:'flex',gap:'1px'}}>
                                <b style={{width:'90%',fontSize:'12px',paddingLeft:'20px',color:'#555555'}}>Produit Plus Consommé</b>
                                <div  style={{
                    alignItems: 'center' ,
                    width: '30px' ,
                    height: '30px' ,
                    borderRadius: '17px' ,
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)' ,
                    padding: ' 1.5px ' ,paddingLeft:'4px'
                }}
                >
                 <MdOutlineQueryStats   onClick={ () => setshowProductStats(true)} style={ { width: '20px' , height: '20px' ,color:'#5B548E'  }} />
                 </div>
                </div>
                                <div style={{height:'30px',marginTop:'0px',display:'flex',gap:'20px'}}>
                                    <p style={{fontSize:'14px',paddingLeft:'20px', color:'#444444'}}> <b>{ProduitPlusConsommés}</b> </p>
                                    <p style={{fontSize:'14px',marginLeft:'20%' , color:'#616262'}}>this  month</p>
                                </div>
                            </div>
                                
                            <div style={{padding:'10px',paddingTop:'15px',paddingLeft:'30px',paddingRight:'30px',borderRadius:'30px',boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',width:'30%',display:'flex' }}>
                               <div style={{width:'100%'}}> 
                                <b style={{fontSize:'26px',fontSize:'18px',color:'#555555'}}>{TotalOrders}</b>
                                <p style={{fontSize:'17px',color:'#444444'}}>Total Orders</p>
                                </div>
                               
                            </div>
                            
                            
                            </div>
                  <Link  style={{ textDecoration: 'none', width: '150px',height: '40px',  borderRadius: '30px', marginTop: '30px',  transition: 'border-color 0.3s ease',backgroundColor: '#0047FF', fontFamily: 'Montserrat, sans-serif',  fontWeight: '500',  fontSize: '16px', color: 'white',  display: 'flex', justifyContent: 'center',alignItems: 'center', textAlign: 'center' }}>Create Command</Link>
                  
                
                </div>  
                            
                        
                            
                        </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "95%",
                height: "40px",
                borderRadius: "20px",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                color: "#100B39",
                border: "none", // Changed text-decoration to border
                marginTop: "30px",
                marginLeft: "20px",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "70px",
                  marginLeft: "160px",
                  width: "40%",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    width: "30%",
                    color: "rgba(58, 53, 65, 0.87)",
                    marginTop: "2px",
                    textAlign: "center",
                  }}
                >
                  Command Id
                </div>
                <div
                  style={{
                    width: "70%",
                    fontSize: "15px",
                    width: "200px",
                    color: "rgba(58, 53, 65, 0.87)",
                    marginTop: "-2px",
                    textAlign: "center",
                  }}
                >
                  Date
                  <button onClick={handleSortClick} style={{border:'none',backgroundColor:'white'}} >
                    <MdOutlineKeyboardArrowDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "70vh",
              marginTop: "6vh",
            }}
          >
            {rolesList}
          </div>
        </div>
      </div> {showProductStats && (
        <ViewProductStats
        onClose={() => setshowProductStats(false)}
        /> )}
    </div>
      
  );
}

export default CommandInterneUser;
