import React, { useEffect, useState } from "react";
import "./MangCommand.css";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Per from "./commandLign.jsx";
import { useNavigate, Link } from "react-router-dom";
// get comands
import axios from "axios";

function Cmds() {
  const navigate = useNavigate();
  const [cmds, setcmds] = useState([]); // État local pour stocker la liste des command
  const [isChecked, setIsChecked] = useState(false); // État local pour le bouton de case à cocher
  const [sortOrder, setSortOrder] = useState("asc"); // État local pour l'ordre de tri (ascendant ou descendant)
  const [selectedState, setSelectedState] = useState("State");
  const [selectedCommand, setSelectedCommand] = useState(null);
  // createdAt updatedAt
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        try {
          const resp = await axios.get("http://localhost:3036/commands", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setcmds(resp.data.reverse());
          console.log(resp.data);
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleClick = () => {
    navigate("/create-cmd");
  };
  // Gérer les changements de la valeur de recherche
  const [searchTerm, setSearchTerm] = useState(""); // État local pour stocker la valeur de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les cmd en fonction de la valeur de recherche
  const filteredCmd = cmds;
  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setcmds(
      [...cmds].sort((a, b) => {
        if (newOrder === "asc") {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      })
    );
  };
  const handleStateFilter = (state) => {
    setSelectedState(state);
    const filteredCommands = cmds.filter((cmd) => {
      if (state === null || state === "State") {
        return true; // Si aucun état n'est sélectionné, affiche toutes les commandes
      } else {
        return cmd.state === state;
      }
    });
    setcmds(filteredCommands);
  };

  return (
    <div className="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
      <div className="row">
        <Nav />
        <Side />
      </div>
      <div className="row">
        <section className="col-md-12 bordureBleue">
          <div className="col-md-5 bordureBleue section-28">
            <div className="fot28">
              <div className="search28">
                <IoSearchOutline />{" "}
                <input
                  type="text"
                  placeholder="search command / supplier"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="cre28">
                <button onClick={handleClick}>create command</button>
              </div>
            </div>
            <div className="permi28">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="roleinp28"
              />
              <p className="roles28">N° Commande </p>
              <p className="supp28">type</p>
              <p className="supp28">userName</p>
              <p className="datte28">
                <p className="eleDate28">Date</p>
                <button onClick={handleSortClick} className="btndate28">
                  <MdOutlineKeyboardArrowDown />
                </button>
              </p>
              <p className="stta28">
                <select
                  className="selctstat28"
                  value={selectedState}
                  onChange={(event) => setSelectedState(event.target.value)}
                  onClick={() => handleStateFilter(selectedState)}
                >
                  <option value="State">State</option>
                  <option value="initialized">initialized</option>
                  <option value="validated">validated</option>
                  <option value="partially">partially</option>
                  <option value="processed">processed</option>
                  <option value="cancelled">cancelled</option>

                  {/* Ajoutez d'autres options au besoin */}
                </select>
              </p>
            </div>
            <div>
              {filteredCmd.map((cmd, index) => (
                <Per
                  key={index}
                  id={cmd.command_id}
                  type={cmd.type}
                  user={cmd.user_id}
                  numCmd={cmd.command_id}
                  date={cmd.createdAt}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Cmds;
