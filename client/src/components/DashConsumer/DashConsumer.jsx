import React, { useEffect, useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import Barchart from "../DashComponents/histogrammeConsumer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashConsumer() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);
  return (
    <div>
      <Nav username={user.username} />
      <div className="dwnusers">
        <Side link="commands" />
        <div
          style={{
            marginTop: "8vh",
            marginLeft: " 7%",
            width: "90%",
            height: "92vh",
            padding: "100px",
          }}
        >
          <div className="crcmd1" style={{ display: "flex " }}>
            <div
              style={{
                width: "100% ",
                height: "450px",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                paddingTop: "20px",
                paddingLeft: "70px",
              }}
            >
              <div style={{ display: "flex" }}>
                {" "}
                <Barchart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashConsumer;
