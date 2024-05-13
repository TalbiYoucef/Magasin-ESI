import React, { useState } from "react";
import Chart from "react-apexcharts";
import { MdOutlineQueryStats } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
function ViewProductStats({  onClose}) {
    const [selectedRange, setSelectedRange] = useState("1 Week");

    const handleChange = (e) => {
        setSelectedRange(e.target.value);
      };

      
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
  return (
     <div className="modal-list-roles" style={{width :'400px' , height :'300px'}}>
    <div className="modal-content-list-roles"> 
    <div className="Graph" style={{   marginRight: "10px"}}>
     
      <div style={{display: "flex",alignItems: "center", justifyContent: "space-between", marginBottom:"20px", marginTop:"20px"}}>
       <select value={selectedRange} onChange={handleChange} style={{ marginLeft:"200px" ,padding: "2px",borderRadius: "20px", border:" 1px #ced4da",boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",fontSize:'12px' , outline: "none",textAlign:" left", width:'80px' ,color:"#347AE2"}}>
          <option value="1 Week">1 Week</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="9 Months">9 Months</option>
          <option value="1 Year">1 Year</option>
        </select> 
        
        <div style={{display:'flex' , flexDirection :'column'  , marginLeft: '20px' , }}>
                <div
                style={{
                    alignItems: 'center' ,
                    paddingLeft: ' 7.5px ' 

                }}
                onClick={onClose}
                >
                   <TiDeleteOutline  
                   style={{ width: '25px' , height: '25' ,color :'#D42803'}}/>
                 </div>
               
                </div>
        
        
        </div>
         <Chart
          options={{
            xaxis: {
              categories: produitplusconsomeeor[selectedRange].categories,
            },
            chart: {
              width: "400px",
              height: "350px",
            },
            colors: ["#347AE2"],
            dataLabels: {
              enabled: false, // Désactiver l'affichage des valeurs des données
            },

          }}
          series={produitplusconsomeeor[selectedRange].series}
          type="area"
        />
       </div>



    </div>
    </div>  
  )
}

export default ViewProductStats