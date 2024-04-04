import React, { useEffect, useState } from 'react'
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function Dashboard() {
  const navigate = useNavigate()
 const [user,setUser] = useState({})
 const [token,setToken] = useState('')
 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      setToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (error) {
      // If an error occurs, redirect to the login page
      navigate("/login");
      console.log(error);
    }
  };
  fetchData();
}, []);
  return (
    <div>
      <Nav  username={user.username} />
      <div  >
        <Side link='dashboard'/>
    </div>
    </div>

  )
}

export default Dashboard