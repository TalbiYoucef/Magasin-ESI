import React from "react";

function TopConsumer(props) {
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "2%",
        padding: "2%",
        height: "120px",
      }}
    >
      <div style={{ fontSize: "19px ", color: "#333333" }}>{props.Title}</div>

      <div style={{ display: "flex", gap: "15%" }}>
        <div>
          <div
            style={{
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              width: "200px ",
              color: "#100b39",
            }}
          >
            <b>{props.item}</b>
          </div>
        </div>
        <div style={{ display: "flex ", flexDirection: "column " }}>
          <div style={{ fontSize: "20px ", color: "#01b3d8" }}>
            <b>{props.total} </b>
          </div>
          <div style={{ fontSize: "17px ", color: "#01b3d8" }}>
            {props.unit}
          </div>
        </div>
      </div>
      <div style={{ fontSize: "17px ", color: "#616262" }}>{props.service}</div>
    </div>
  );
}

export default TopConsumer;
