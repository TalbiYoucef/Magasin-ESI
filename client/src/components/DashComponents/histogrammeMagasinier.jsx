import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Barchart() {

  const [MostConsumedProduct, setMostConsumedProduct] = useState([ "papier" ]);

  const [ProductsData, setProductsData] = useState([
   
        { name: "papier", data: [4, 4, 4, 4, 4, 4, 4, 9, 20, 7, 100, 1234] },
        { name: "Product 2", data: [7890, 1234, 5678, 9876, 5432, 8765, 2345, 6789, 1234, 5678, 9876, 5432] },
     

  ]);

  const [selectedRangeProduct, setSelectedRangeProduct] = useState("MostProduct");
  const [filteredProducts, setFilteredProducts] = useState(ProductsData);

  
  const handleChangeProduct = (e) => {
    setSelectedRangeProduct(e.target.value);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = ProductsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts || []);
  };


  const selectedProductObject = selectedRangeProduct === "MostProduct" ? ProductsData.find((product) => product.name == MostConsumedProduct) : ProductsData.find((product) => product.name === selectedRangeProduct);
  const selectedProductsData = selectedProductObject?.data || [];
  const selectedProductsName = selectedProductObject?.name || "";


  return (
    <React.Fragment>
   

      <div className="container-fluid mb-5">
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Rechercher un produit"
            onChange={handleSearch}
            style={{
              padding: "2px",
              paddingLeft: '4px',
              borderRadius: "10px",
              border: "1px solid #ced4da",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
              fontSize: "12px",
              outline: "none",
              textAlign: "left",
              width: "150px",
            }}
          />
          <select
            value={selectedRangeProduct}
            onChange={handleChangeProduct}
            style={{
              padding: "2px",
              borderRadius: "20px",
              border: "1px solid #ced4da",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
              fontSize: "12px",
              outline: "none",
              textAlign: "left",
              width: "150px",
              color: 'black'
            }}
          >
            <option value="MostProduct">MostProduct</option>
            {filteredProducts?.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <Chart
          type="bar"
          width={400}
          height={400}
          series={[
            {
              name: "Total Products",
              data: selectedProductsData,
            },
          ]}
          options={{
            title: {
              text: "Products",
              style: { fontSize: 20 },
            },
            subtitle: {
              text: selectedProductsName,
              style: { fontSize: 16 },
            },
            colors: ["#01b3d8"],
            theme: { mode: "light" },
            xaxis: {
              tickPlacement: "on",
              categories: [
                "janvier",
                "février",
                "mars",
                "avril",
                "mai",
                "juin",
                "juillet",
                "août",
                "septembre",
                "octobre",
                "novembre",
                "décembre",
              ],
            },
            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#616262"] },
              },
              title: {
                text: "Total Products",
                style: { color: "#616262", fontSize: 16 },
              },
            },
            legend: {
              show: true,
              position: "right",
            },
            dataLabels: {
              enabled: false,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default Barchart;
