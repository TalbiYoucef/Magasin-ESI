import React, { useEffect, useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import TopConsumer from "../DashComponents/Total";
import Barchart from "../DashComponents/histogrammeService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashChefService() {
  const [total, setTotal] = useState(255);
  const [TopServiceConsumerName, setTopServiceConsumerName] = useState(
    "Sidi Mohamed Benslimane"
  );
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
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "20px",
              width: "30%",
              boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              marginBottom: "10px",
              marginLeft: "35%",
            }}
          >
            <TopConsumer
              Title={"Top Consumer"}
              item={TopServiceConsumerName}
              total={total}
              unit="product"
            />
          </div>

          <div className="crcmd1" style={{ display: "flex ", gap: "20px" }}>
            <div
              style={{
                width: "100% ",
                height: "450px",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                paddingTop: "20px",
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

export default DashChefService;
