import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from '../nav/nav';
import Side from '../side/side';
import EditPro from './editPro';
import './editProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("User data:", res.data.user);
        setUser(res.data.user);
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <Nav username={user.username} />
      <div className='dwnuser'>
        <Side link='setting'/>
        <div className="Sect2user">
          <div className='downuser'>
            <EditPro user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
