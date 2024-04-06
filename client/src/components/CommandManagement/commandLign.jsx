import React, { useEffect, useState } from "react";
import "./commandLign.css";
import { Link, useNavigate } from "react-router-dom";
import Roledata from "./commandData.jsx";
import axios from "axios";
function Rollig(props) {
  const id = props.id;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedCommand, setSelectedCommand] = useState(null); // État local pour stocker les données de la commande sélectionnée
  const [command, setCommand] = useState({});
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        try {
          const resp = await axios.get(`http://localhost:3036/commands/${id}`, {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          try {
            const user = await axios.get(
              `http://localhost:3036/users/${props.user}`,
              {
                headers: { Authorization: `Bearer ${res.data.accessToken}` },
                withCredentials: true,
              }
            );

            setUsername(user.data.username);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          navigate("/dashboard");
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

  const handleDelete = () => {
    alert("Are you sure You Wanna Delete This Command ?");

    setIsVisible(false);
    console.log("deleted");
  };

  //-------------------------
  const handleViewClick = (numCmd) => {
    console.log("Numéro de commande:", numCmd);
    // const cmdinfos = Roledata.find((command) => command.numCmd === numCmd);
    // console.log("Informations cmd:", cmdinfos);
    // setSelectedCommand(cmdinfos);
    // if (cmdinfos) {
    //   localStorage.setItem("selectedCommand", JSON.stringify(cmdinfos));
    //   console.log("Commande sélectionnée stockée dans le stockage local.");
    //   // Rediriger vers la page où vous souhaitez afficher les détails de la commande
    //   // window.location.href = "/CommandDetails";
    // } else {
    //   console.log("Aucune commande trouvée avec ce numéro.");
    // }
  };

  //------------------
  const handleEditClick = (numCmd) => {
    console.log("Numéro de commande:", numCmd);
    // const cmdinfos = Roledata.find((command) => command.numCmd === numCmd);
    // console.log("Informations cmd:", cmdinfos);
    // if (cmdinfos) {
    //   localStorage.setItem("selectedCommand", JSON.stringify(cmdinfos));
    //   console.log("Commande sélectionnée stockée dans le stockage local.");
    //   // Rediriger vers la page où vous souhaitez afficher les détails de la commande
    //   // window.location.href = "/CommandEdit";
    // } else {
    //   console.log("Aucune commande trouvée avec ce numéro.");
    // }
  };

  return (
    <div>
      {isVisible && (
        <div className="oper29">
          <input
            type="checkbox"
            className="check29"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p className="numCMD29">{props.numCmd}</p>
          <p className="sup29">{props.type}</p>
          <p className="sup29">{username}</p>
          <p className="dat29">{props.date}</p>
          <p className="sta29">{"pending"}</p>

          <Link
            to={`/view-cmd/${id}`}
            className="edi29"
            onClick={() => {
              handleViewClick(props.numCmd);
            }}
          >
            View
          </Link>

          <Link
            to={`/edit-cmd/${id}`}
            className="edi29"
            onClick={() => {
              handleEditClick(props.numCmd);
            }}
          >
            Edit
          </Link>
          <button className="del29" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Rollig;
