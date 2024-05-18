import React from "react";
import Chart from "react-apexcharts"; // npm install react-apexcharts

const Stock = ({ width, height }) => {
  const data = {
    series: [
      {
        name: "total products",
        data: [10, 50, 30, 90, 40, 120, 100,40,80,90,10,80], //produit dans le stock pour chaque mois
      },
    ],
    options: {
      chart: {
        type: "area",
        height: height || '200', // Utilise la hauteur passée en prop ou 250 par défaut
        width: width || '850' // Utilise la largeur passée en prop ou 600 par défaut
      },
      fill: {
        colors: ["#347AE2"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#347AE2"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "category", // Change type to category
        categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      },
      yaxis: {
        show: true
      },
      toolbar: {
        show: false
      }
    },
  };
  
  return (
    <div>
      <Chart options={data.options} series={data.series} type="area" height={data.options.chart.height} width={data.options.chart.width} />
    </div>
  );
};

export default Stock;
