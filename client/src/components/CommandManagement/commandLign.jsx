import React, { useEffect, useState } from "react";
import "./commandLign.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Rollig(props) {
  const id = props.id;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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

  const handleDelete = async () => {
    alert("Are you sure You Wanna Delete This Command ?");
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      await axios
        .delete(`http://localhost:3036/commands/${id}`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        })
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
        setIsVisible(false);
        console.log("deleted");
    } catch (error) {
      console.log(error)
      navigate('/login')
    }
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
            to={`/bon-cmd/${id}`}
            className="edi29" 
          >
            View
          </Link>

          <Link
            to={`/edit-cmd/${id}`}
            className="edi29"
            
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
