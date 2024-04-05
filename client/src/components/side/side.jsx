import React, { useEffect, useState } from "react";
import "./side.css";
import { Link, useNavigate } from "react-router-dom"; // Si vous utilisez React Router
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { PiSquaresFourLight } from "react-icons/pi";
import axios from "axios";

function Side(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user);
        setIsAdmin(res.data.admin);
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleLogOut = async () => {
    try {
      const res = await axios.get("http://localhost:3036/auth/logout", {
        withCredentials: true,
      });
      console.log(res)
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="nav__cont">
      <ul className="navv">
        <li className="nav__items ">
          <a
            href="dashboard"
            className={`link ${props.link === "dashboard" ? "active" : ""}`}
          >
            <GoHome className="ic" />
            Dashboard
          </a>
        </li>
        {isAdmin && (
          <>
            <li className="nav__items ">
              <a
                href="users"
                className={`link ${props.link === "users" ? "active" : ""}`}
              >
                <CiUser className="ic" />
                Users management
              </a>
            </li>

            <li className="nav__items ">
              <a
                href="roles"
                className={`link ${props.link === "roles" ? "active" : ""}`}
              >
                <PiSquaresFourLight className="ic" />
                Roles management
              </a>
            </li>
          </>
        )}
        <li className="nav__items ">
          <a
            href="setting"
            className={`link ${props.link === "setting" ? "active" : ""}`}
          >
            <IoSettingsOutline className="ic" />
            Setting
          </a>
        </li>

        <li className="nav__items ">
          <a
            href="help"
            className={`link ${props.link === "help" ? "active" : ""}`}
          >
            <MdOutlinePrivacyTip className="ic" />
            Help & Privacy{" "}
          </a>
        </li>

        <li className="nav__items ">
          <Link onClick={handleLogOut}>
            log out
            <FiLogOut className="ic" />
          </Link>
          {/* <a href='login' >
        Log Out </a> */}
        </li>
      </ul>
    </nav>
  );
}

export default Side;
