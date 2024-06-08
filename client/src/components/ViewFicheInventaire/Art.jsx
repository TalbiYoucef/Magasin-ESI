import React, { useState, useEffect } from "react";
import Side from "../side/side.jsx";
import Nav from "../nav/nav.jsx";
import PerLine from "./ProLine.jsx";
import Baarr from "./Bar.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Art() {
  const { id } = useParams();
  const [branchName, setBranchName] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCreateChapitreForm, setShowCreateChapitreForm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });
        console.log("reres", res.data);
        setUser(res.data.user);
        try {
          const resp = await axios.get(
            `http://localhost:3036/chapters/${id}/branches`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setArticles(resp.data);
        } catch (error) {
          console.log(error, "smth wrong");
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  const ProductsList = articles.map((element, index) => (
    <PerLine id={element.branch_id} key={index} rolenam={element.name} />
  ));

  return (
    <div>
      <Nav username={user.username} />
      <div style={{ display: "flex", height: "92vh" }}>
        <Side link="roles" />
        <div
          style={{
            width: "85%",
            marginLeft: "10%",
            marginTop: " 8vh",
          }}
        >
          <div
            style={{
              position: "fixed",
              height: "22vh",
              backgroundColor: "white",
              width: "85%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: " space-between ",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginRight: "40px",
                }}
              ></div>
            </div>
            <Baarr />
          </div>
          <div
            style={{
              paddingtop: "20px",
              marginTop: "30vh",
              width: "85%",
              marginLeft: "20px",
            }}
          >
            {ProductsList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Art;
