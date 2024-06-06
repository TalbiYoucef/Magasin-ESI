import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Barchart() {
  const [CurentConsumer, setCurentConsumer] = useState("Consumer 1A");

  const [MostConsumerProduct, setMostConsumerProduct] = useState([
    { consumer: "Consumer 1A", Product: "papier" },
  ]);

  const [ConsumerData, setConsumerData] = useState([
    {    
      name: "Consumer 1A",
      data: [1234, 5678, 987, 5432, 8765, 2345, 6789, 3456, 7890, 1234, 5678, 987],
      products: [
        { name: "papier", data: [4567, 8901, 2345, 6789, 1234, 5678, 9876, 5432, 8765, 2345, 6789, 1234] },
        { name: "Product 2", data: [7890, 1234, 5678, 9876, 5432, 8765, 2345, 6789, 1234, 5678, 9876, 5432] },
      ],
    },
  ]);

  const [selectedRangeProduct, setSelectedRangeProduct] = useState("MostProduct");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const selectedConsumerObject = ConsumerData.find((consumer) => consumer.name === CurentConsumer);
    const mostProductInConsumer = MostConsumerProduct.find((product) => product.consumer === selectedConsumerObject?.name)?.Product || "";
    const selectedProductObject = selectedRangeProduct === "MostProduct" ? selectedConsumerObject?.products.find((product) => product.name === mostProductInConsumer) : selectedConsumerObject?.products.find((product) => product.name === selectedRangeProduct);
    setFilteredProducts(selectedConsumerObject?.products || []);
  }, [CurentConsumer, selectedRangeProduct, ConsumerData, MostConsumerProduct]);

  const handleChangeProduct = (e) => {
    setSelectedRangeProduct(e.target.value);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const selectedConsumerObject = ConsumerData.find((consumer) => consumer.name === CurentConsumer);
    const filteredProducts = selectedConsumerObject?.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts || []);
  };

  const selectedConsumerObject = ConsumerData.find((consumer) => consumer.name === CurentConsumer);
  const selectedConsumerData = selectedConsumerObject?.data || [];
  const selectedConsumerName = selectedConsumerObject?.name || "";

  const mostProductInConsumer = MostConsumerProduct.find((product) => product.consumer === selectedConsumerObject?.name)?.Product || "";
  const selectedProductObject = selectedRangeProduct === "MostProduct" ? selectedConsumerObject?.products.find((product) => product.name === mostProductInConsumer) : selectedConsumerObject?.products.find((product) => product.name === selectedRangeProduct);
  const selectedProductsData = selectedProductObject?.data || [];
  const selectedProductsName = selectedProductObject?.name || "";

  // Debugging console logs
  console.log("Selected Consumer Data:", selectedConsumerData);
  console.log("Selected Product Data:", selectedProductsData);

  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
        <Chart
          type="bar"
          width={400}
          height={400}
          series={[
            {
              name: "Total Products",
              data: selectedConsumerData,
            },
          ]}
          options={{
            title: {
              text: "Consumer",
              style: { fontSize: 20 },
            },
            subtitle: {
              text: selectedConsumerName,
              style: { fontSize: 16 },
            },
            colors: ["#00b964"],
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
