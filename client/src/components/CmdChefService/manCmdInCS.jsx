import React, { useState } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Cmd from "../data/CommandInterne.jsx"; //command interne data
import Per from "./CmdinCSLig.jsx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiNotebookLight } from "react-icons/pi";

const username = "chahi";

function CommandIntern() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Cmds, setCmds] = useState(Cmd);
  const [sortOrder, setSortOrder] = useState("asc");
  const [TotalOrders, setTotalOrders] = useState("135");
  const [EmployéPlusFournitureds, setEmployéPlusFournitureds] =
    useState("bounoua chahianz");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredRoles = Cmd.filter((article) =>
    article.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rolesList = filteredRoles
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    })
    .map((Cmd, index) => (
      <Per key={index} id={Cmd.id} Employé={Cmd.Employé} date={Cmd.date} />
    ));

  return (
    <div>
      <Nav username={username} />
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
                      {TotalOrders}
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
                      {EmployéPlusFournitureds}
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
                    marginTop: "0px",
                    textAlign: "center",
                  }}
                >
                  Command Id
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    width: "54%",
                    color: "rgba(58, 53, 65, 0.87)",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  Employé{" "}
                </div>
                <div
                  style={{
                    width: "26%",
                    fontSize: "15px",
                    width: "200px",
                    color: "rgba(58, 53, 65, 0.87)",
                    marginTop: "-2px",
                    textAlign: "center",
                  }}
                >
                  Date
                  <button onClick={handleSortClick}>
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

export default CommandIntern;
