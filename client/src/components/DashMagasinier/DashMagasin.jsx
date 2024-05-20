import React, { useState } from "react";
import Side from "../side/side";
import Nav from "../nav/nav";
import Total from "../DashComponents/Total";
import Circle from "../DashComponents/Circle";
import Stock from "../DashComponents/Stock";
import Graph from "../DashComponents/MostGraphsMagasinier";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiStorefront } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { FaCircle } from "react-icons/fa";

function DashMagasinier() {
  const [ReturnedDischarge, setReturnedDischarge] = useState(35);
  const [TotalinternalOrders, setTotalinternalOrders] = useState(258);
  const [TotalExternalOrders, setTotalExternalOrders] = useState(258);
  const [TotalReceipts, setReceipts] = useState(40);
  const [TotalProducts, setTotalProducts] = useState(4000);

  return (
    <div>
      <Nav />
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
            className="crcmd1"
            style={{
              display: "flex ",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "  auto ",
                borderRadius: "20px",
                marginLeft: "4.5%",
                width: "91.5%",
                gap: "20px",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                padding: "2px",
                marginBottom: "10px",
              }}
            >
              <Total
                total={TotalinternalOrders}
                item="Total internal Orders"
                icon={<LuClipboardList />}
              />
              <div
                style={{
                  width: "1px",
                  height: "50px",
                  marginTop: "12px",
                  backgroundColor: "#ccc",
                }}
              />
              <Total
                total={TotalProducts}
                item="Total Products"
                icon={<PiStorefront />}
              />
              <div
                style={{
                  width: "1px",
                  height: "50px",
                  marginTop: "12px",
                  backgroundColor: "#ccc",
                }}
              />
              <Total
                total={TotalExternalOrders}
                item="Total External Orders"
                icon={<MdOutlineLocalGroceryStore />}
              />
              <div
                style={{
                  width: "1px",
                  height: "50px",
                  marginTop: "12px",
                  backgroundColor: "#ccc",
                }}
              />
              <Total
                total={TotalReceipts}
                item="Total Receipts"
                icon={<GrDeliver />}
              />
            </div>
          </div>

          <div className="crcmd1" style={{ display: "flex ", gap: "20px" }}>
            <div
              style={{
                width: "70% ",
                height: "260px",
                marginLeft: "4.5%",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  color: "#333333",
                  fontSize: "20px",
                  marginLeft: "40%",
                }}
              >
                {" "}
                <strong>Stock Analytics </strong>
              </div>
              <Stock />
            </div>

            <div
              style={{
                width: "20%",
                height: "260px",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "20px 50px",
              }}
            >
              <div
                style={{
                  color: "#333333",
                  fontSize: "20px",
                  marginBottom: "10px",
                  marginLeft: "8%",
                }}
              >
                <strong>Dischrge status</strong>
              </div>
              <Circle DischargeReturned={ReturnedDischarge} />
              <div
                style={{ color: "#557BDD", fontSize: "15px", marginTop: "5px" }}
              >
                <FaCircle style={{ fontSize: "10px", marginRight: "8px" }} />
                Returned Discharge{" "}
              </div>
            </div>
          </div>

          <Graph />
        </div>
      </div>
    </div>
  );
}

export default DashMagasinier;
