import React, { useState } from "react";
import Chart from "react-apexcharts";

const Graph = () => {
  const [selectedRange1, setSelectedRange1] = useState("1 Week");
//data of produitplusconsome
const ServiceplusC = 
  { id: '0',
    nomproduit: 'Service',
    quantite: '1980',
  };
  // data of produitplusconsome 1 week, 1 month, 3 months, 6 months, 9 months, and 1 year
  const Serviceplusconsomee = {
    "1 Week": {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      series: [
        { name: "Graph 1",
          data: [10, 50, 30, 90, 40, 250, 100],
        }, ],},
    "1 Month": {
      categories: [
        "2024-05-01", "2024-05-07", "2024-05-14","2024-05-21", "2024-05-31",],
      series: [
        {  name: "Graph 1",
          data: [10, 50, 30, 90, 40],
        }, ],},
    "3 Months": {
      categories: [
        "2024-02-01", "2024-03-01", "2024-04-01"  ],
      series: [
        { name: "Graph 1",
          data: [30, 40, 20], }, ],},
    "6 Months": {
      categories: ["2024-12-01","2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01","2023-05-01"  ],
      series: [
        {name: "Graph 1",
          data: [ 30, 50, 70, 20, 90, 80],
        }, ], },
    "9 Months": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ],
      series: [
        {
          name: "Graph 1",
          data: [150,195,20, 70, 40, 80, 30, 100, 90],
        },
      ],
    },
    "1 Year": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ,"2024-06-01", "2024-07-01", "2024-08-01" ],
      series: [
        { name: "Graph 1",
          data: [123,176,89,40,79,50, 60, 80, 40, 90, 110, 120],
        },
      ],
    },
  };
  const [selectedRange, setSelectedRange] = useState("1 Week");
//data of produitplusconsome
const produitplusC = 
  { id: '0',
    nomproduit: 'papier',
    quantite: '1290',
  };
  // data of produitplusconsome 1 week, 1 month, 3 months, 6 months, 9 months, and 1 year
  const produitplusconsomeeor = {
    "1 Week": {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      series: [
        { name: "Graph 1",
          data: [10, 50, 30, 90, 40, 250, 100],
        }, ],},
    "1 Month": {
      categories: [
        "2024-05-01", "2024-05-07", "2024-05-14","2024-05-21", "2024-05-31",],
      series: [
        {  name: "Graph 1",
          data: [10, 50, 30, 90, 40],
        }, ],},
    "3 Months": {
      categories: [
        "2024-02-01", "2024-03-01", "2024-04-01"  ],
      series: [
        { name: "Graph 1",
          data: [30, 40, 20], }, ],},
    "6 Months": {
      categories: ["2024-12-01","2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01","2023-05-01"  ],
      series: [
        {name: "Graph 1",
          data: [ 30, 50, 70, 20, 90, 80],
        }, ], },
    "9 Months": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ],
      series: [
        {
          name: "Graph 1",
          data: [150,195,20, 70, 40, 80, 30, 100, 90],
        },
      ],
    },
    "1 Year": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ,"2024-06-01", "2024-07-01", "2024-08-01" ],
      series: [
        { name: "Graph 1",
          data: [123,176,89,40,79,50, 60, 80, 40, 90, 110, 120],
        },
      ],
    },
  };

  const [selectedRange2, setSelectedRange2] = useState("1 Week");
//data of produitplusconsome
const produitmoinsC = 
  {id: '0',
    nomproduit: 'papier',
    quantite: '190',
  };
  // Data produitmoinsconsome
  const produitmoinsconsomee = {
    "1 Week": {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      series: [
        { name: "Graph 2",
          data: [20, 30, 60, 80, 50, 90, 110],
        },
      ],
    },
    "1 Month": {
      categories: [  "2024-05-01",  "2024-05-07",  "2024-05-14", "2024-05-21", "2024-05-31",],
      series: [
        {  name: "Graph 2",
          data: [30, 40, 70, 90, 60],
        }, ],},
    "3 Months": {
      categories: [ "2024-02-01",  "2024-03-01", "2024-04-01" ],
      series: [
        { name: "Graph 2",
          data: [40, 50,80],
        },],},
    "6 Months": {
      categories: [ "2023-12-01", "2024-01-01","2024-02-01", "2024-03-01",  "2024-04-01",  "2023-05-01", ],
      series: [
        { name: "Graph 2",
          data: [ 60, 90, 110, 80, 120, 140],
        },
      ],
    },
    "9 Months": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ],
      series: [
        {
          name: "Graph 2",
          data: [  180,100,70, 70, 100, 120, 90, 130, 150],
        },
      ],
    },
    "1 Year": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ,"2024-06-01", "2024-07-01", "2024-08-01" ],
    
      series: [
        {name: "Graph 2",
          data: [ 67,98,156,96,250,70, 80, 110, 130, 100, 140, 160],
        },  ],},};
  const [selectedRange3, setSelectedRange3] = useState("1 Week");
//data of articleplusconsome
const articleplusC = 
  { id: '0',
    nomArticle: 'article2',
    quantite: '120',
  };
  // data of Articleplusconsomeeor =or graph 2
  const Articleplusconsomee = {
    "1 Week": {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      series: [
        {name: "Graph 2",
          data: [20, 30, 60, 80, 50, 90, 110],
        }, ],
    },
    "1 Month": {
      categories: [
        "2024-05-01", "2024-05-07", "2024-05-14","2024-05-21", "2024-05-31", ],
      series: [
        {
          name: "Graph 2",
          data: [30, 40, 70, 90, 60],
        },
      ],
    },
    "3 Months": {
      categories: [ "2024-02-01",  "2024-03-01","2024-04-01", ],
      series: [
        { name: "Graph 2",
          data: [40, 50, 80],
        }, ],},
    "6 Months": {
      categories: [  "2024-12-01",  "2024-01-01", "2024-02-01", "2024-03-01","2024-04-01", "2023-05-01",  ],
      series: [
        { name: "Graph 2",
          data: [50, 60, 90, 110, 80, 120],},  ], },
    "9 Months": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ],
      series: [
        {  name: "Graph 2",
          data: [ 100, 120,60, 70, 100, 120, 90, 130, 150],
        },
      ],
    },
    "1 Year": {
      categories: [
        "2023-09-01", "2023-10-01", "2023-11-01","2024-12-01", "2024-01-01","2024-02-01","2024-03-01","2024-04-01", "2024-05-01" ,"2024-06-01", "2024-07-01", "2024-08-01" ],
    
      series: [
        { name: "Graph 2",
          data: [70, 80, 110, 130, 100, 140, 70, 80, 110, 130, 100, 140, 160],
        }, ],  },};
  const handleChange = (e) => {
    setSelectedRange(e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectedRange2(e.target.value);
  };
  return (
    <div style={{ display: "flex", gap: '60px', padding :'0px 60px' }}>
      <div className="Graph" style={{ flex: 1, marginRight: "10px"}}>
      <div style={{display: "flex",alignItems: "center", justifyContent: "space-between", marginTop:"20px"}}>
      <span  style={{ marginLeft:"20px", fontSize:'15px' }}>Produit Plus Consommé</span> 
      <select value={selectedRange} onChange={handleChange} style={{padding: "2px",borderRadius: "20px", border:" 1px #ced4da",boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",fontSize:'12px' , outline: "none",textAlign:" left", width:'80px'}}>
    <option value="1 Week">1 Week</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="9 Months">9 Months</option>
          <option value="1 Year">1 Year</option>
        </select></div>
        <span style={{  fontSize:"20px", marginTop :"0",marginLeft:"20px" }}>{produitplusC.nomproduit}</span>
        <b style={{fontSize:"26px",  marginTop :"0",marginLeft:"50px" }}>{produitplusC.quantite}</b>
        <Chart
          options={{
            xaxis: {
              categories: produitplusconsomeeor[selectedRange].categories,
            },
            chart: {
              width: "0px",
              height: "150px",
            },
            colors: ["#008000"],
          }}
          series={produitplusconsomeeor[selectedRange].series}
          type="area"
        />
      </div>
      <div className="Graph" style={{ flex: 1,  }}>
      <div style={{display: "flex",alignItems: "center", justifyContent: "space-between", marginTop:"20px"}}>
      <span  style={{ marginLeft:"20px" , fontSize:'15px'}}>Produit Moins Consommé</span> 
        <select value={selectedRange2} onChange={handleChange2} style={{padding: "2px",borderRadius: "20px", border:" 1px #ced4da",boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",fontSize:'12px' , outline: "none",textAlign:" left", width:'80px'}}>
          <option value="1 Week">1 Week</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="9 Months">9 Months</option>
          <option value="1 Year">1 Year</option>
        </select></div>
        <span style={{ fontSize:"20px", marginTop :"0",marginLeft:"20px" }}>{produitmoinsC.nomproduit}</span>
        <b style={{fontSize:"26px",  marginTop :"0",marginLeft:"50px" }}>{produitmoinsC.quantite}</b>
        <Chart
          options={{
            xaxis: {
              categories: produitmoinsconsomee[selectedRange2].categories,
            },
            chart: {
              width: "0px",
              height: "150px",
            },
             colors: ["#ED1C24"], // Setting color to red
          }}
          series={produitmoinsconsomee[selectedRange2].series}
          type="area"
     
        />
      </div>
      <div className="Graph" style={{ flex: 1 }}>
      <div style={{display: "flex",alignItems: "center", justifyContent: "space-between"}}>
     <span style={{ marginLeft:"20px", marginTop:"20px" }}>Article Plus Consommé</span> 
     </div>
     <span style={{ fontSize:"20px", marginLeft:"20px" }}>{articleplusC.nomArticle}</span>
     <b style={{   fontSize:"26px",marginTop :"0",marginLeft:"50px" }}>{articleplusC.quantite}</b>
     
        <Chart
          options={{
            xaxis: {
              categories: Articleplusconsomee[selectedRange3].categories,},
            chart: {
              width: "0px",
              height: "150px",
            },
            colors: ["#8400D5"],
          }}
          series={Articleplusconsomee[selectedRange3].series}
          type="area"
        />
      </div>
    </div>
  );
};
export default Graph;
