import React, { useEffect, useState } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { BsSearch } from "react-icons/bs"; //command interne data
import Per from "./CommandInLig.jsx";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import { PiNotebookLight } from "react-icons/pi";

function CommandInterne() {
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [internals, setInternals] = useState([]);
  const [isHeadOfService, setIsHeadOfService] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data.user);
        setIsHeadOfService(res.data.isHeadOfService);
        try {
          const respo = await axios.get(
            res.data.perms.includes(15)
              ? "http://localhost:3036/internalorders/status/accepted"
              : `http://localhost:3036/commands/service/${res.data.serviceId}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          console.log(respo.data);
          setInternals([...respo.data].reverse());
          if (res.data.perms.includes(15)) {
            try {
              const respo = await axios.get(
                "http://localhost:3036/internalorders/status/satisfied",
                {
                  headers: {
                    Authorization: `Bearer ${res.data.accessToken}`,
                  },
                  withCredentials: true,
                }
              );
              console.log("////",respo.data);
              setInternals(prev=> [...prev,...respo.data].reverse());
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
          alert("something went wrong");
          return;
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
      link={"edit-cmdi"}
      status={produit.status}
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
            <div style={{ display: "flex", gap: "450px" }}>
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
                style={{
                  width: "45%",
                  height: "90px",
                  gap: "50px",
                  display: "flex",
                }}
              >
                {isHeadOfService && (
                  <>
                    <div
                      style={{
                        padding: "10px",
                        paddingTop: "15px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        borderRadius: "30px",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                        width: "50%",
                        display: "flex",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <b
                          style={{
                            fontSize: "26px",
                            fontSize: "18px",
                            color: "#555555",
                          }}
                        >
                          {134}
                        </b>
                        <p style={{ fontSize: "18px", color: "#444444" }}>
                          Total Orders
                        </p>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "15%",
                            borderRadius: "12px",
                            width: "29%",
                            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                            height: "50%",
                            marginLeft: "65%",
                          }}
                        >
                          <PiNotebookLight
                            style={{
                              fontSize: "25px",
                              marginTop: "5px",
                              marginLeft: "4px",
                              alignItems: "center",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "15px",
                        width: "50%",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                        borderRadius: "30px",
                      }}
                    >
                      <b
                        style={{
                          width: "90%",
                          fontSize: "16px",
                          paddingLeft: "15px",
                          color: "#555555",
                        }}
                      >
                        Employé Plus de Fourniture
                      </b>
                      <div
                        style={{
                          height: "30px",
                          marginTop: "8px",
                          display: "flex",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                            paddingLeft: "15px",
                            color: "#444444",
                          }}
                        >
                          {"EmployéPlusFournitureds"}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            marginLeft: "10px",
                            color: "#616262",
                          }}
                        >
                          this month
                        </p>
                      </div>
                    </div>
                  </>
                )}
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
                  gap: "20px",
                  marginLeft: "160px",
                  width: "53%",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    width: "20%",
                    color: "rgba(58, 53, 65, 0.87)",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  Command Id
                </div>
                <div
                  style={{
                    width: "30%",
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

export default CommandInterne;
