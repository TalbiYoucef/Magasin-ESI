import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { BsSearch } from "react-icons/bs";
import produit from "../data/CommandInterne.jsx"; //command interne data
import Per from "./CmdLigUser.jsx";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axios from "axios";

function CommandInterneUser() {
  const [user, setUser] = useState({});
  const [internals, setInternals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        setUser(res.data.user);
        console.log(res.data)
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
            <div style={{ display: "flex", gap: "60%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "290px",
                  height: "40px",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  color: "#616262",
                  marginTop: "30px",
                  marginLeft: "40px",
                }}
              >
                <BsSearch className="search-icon" />
                <input
                  type="search"
                  placeholder="search command"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  style={{ border: "none", height: "30px", width: "150px" }}
                />
              </div>
              <div
                style={{ display: "flex", marginRight: "40px", gap: "50px" }}
              >
                <Link
                  to="/cr-cmdi"
                  style={{
                    textDecoration: "none",
                    width: "160px",
                    height: "40px",
                    borderRadius: "30px",
                    marginTop: "30px",
                    marginRight: "0px",
                    transition: "border-color 0.3s ease",
                    backgroundColor: "#0047FF",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  Create Command
                </Link>
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
                    marginTop: "10px",
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
                  <button onClick={handleSortClick} className="btndate28">
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
      </div>
    </div>
  );
}

export default CommandInterneUser;
