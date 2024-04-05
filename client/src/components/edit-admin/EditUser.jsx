import React, { useEffect, useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import Admin from "./admin";
import "./EditUser.css";
import axios from "axios";
const EditUser = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnuser">
        <Side link="users" />
        <div className=" Sect2user">
          <div className="downuser">
            <Admin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
