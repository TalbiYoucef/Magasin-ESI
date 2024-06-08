import React, { useEffect, useState } from "react";
import pro from "../../assets/profil_sans_photo.jpg";
import "./UPro.css";
import { IoPencil } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Side from "../side/side";
import Nav from "../nav/nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Profils() {
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
        console.log(user);
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
        <Side link="Settings" />
        <div className=" Sect2user">
          <div className="downuser">
            <div className="upusers1">
              <ul>
                <li className="profil">
                  <div
                    style={{
                      marginLeft: "160px",
                      display: "flex",
                      marginTop: "20px",
                      flexDirection: "row",
                    }}
                  >
                    <div className="imgBox">
                      <img src={pro} alt="profil" />
                    </div>
                    <div
                      style={{
                        marginLeft: "2%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <p className="name">
                        {" "}
                        {`${user.firstname} ${user.lastname}`}
                      </p>
                      <p className="admin">{user.username}</p>
                    </div>
                  </div>
                  <p className="ena" style={{ marginLeft: "1px" }}>
                    {String(user.status).toUpperCase()}
                  </p>
                </li>
              </ul>
            </div>
            <ul>
              <li className="comp" style={{ marginLeft: "160px  " }}>
                <Link
                  to="/EditProfile"
                  className="edit"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IoPencil size={20} />
                    <span style={{ marginRight: "8px" }}>&nbsp;</span>
                    <p className="e" style={{ margin: "0" }}>
                      Edit profile infos
                    </p>
                  </div>
                  <span style={{ marginLeft: "220px" }}>
                    <MdNavigateNext size={30} />
                  </span>{" "}
                  {/* Aligner à droite */}
                </Link>
              </li>
              <li className="comp" style={{ marginLeft: "160px  " }}>
                <Link
                  to="/EditPassword"
                  className="edit"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RiLockPasswordLine size={20} />
                    <span style={{ marginRight: "8px" }}>&nbsp;</span>{" "}
                    {/* Espace */}
                    <p className="e" style={{ margin: "0" }}>
                      Security
                    </p>
                  </div>
                  <span style={{ marginLeft: "220px" }}>
                    <MdNavigateNext size={30} />
                  </span>{" "}
                  {/* Aligner à droite */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profils;
