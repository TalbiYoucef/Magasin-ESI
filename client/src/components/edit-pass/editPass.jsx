import React from "react";
import EditPass from "./password";
import Side from "../side/side";
import Nav from "../nav/nav";
import "./password.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const EditPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
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
      <Nav username={user.username} />
      <div className="dwnuser">
        <Side link="setting" />
        <div className=" Sect2user">
          <div className="downuser">
            <EditPass />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
