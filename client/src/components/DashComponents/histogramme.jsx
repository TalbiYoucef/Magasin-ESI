import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Barchart() {
  const [MostService, setMostServicedata] = useState({
    name: "Service A",
    data: [6578, 6787, 3245, 9876, 2324, 5123, 2435, 1987, 1376, 3245, 9876, 2324],
  });

  const [MostServiceConsumer, setMostServiceConsumer] = useState([
    { Service: "Service A", consumer: "Consumer 1A" },
    { Service: "Service B", consumer: "Consumer 1B" },
  ]);

  const [MostConsumerProduct, setMostConsumerProduct] = useState([
    { consumer: "Consumer 1A", Product: "papier" },
    { consumer: "Consumer 2A", Product: "Product 4" },
  ]);

  const [ServicesData, setServicesData] = useState([
    {
      name: "Service A",
      data: [6578, 6787, 3245, 9876, 2324, 5123, 2435, 1987, 1376, 3245, 9876, 2324],
      consumers: [
        {
          name: "Consumer 1A",
          data: [1234, 5678, 987, 5432, 8765, 2345, 6789, 3456, 7890, 1234, 5678, 987],
          products: [
            { name: "papier", data: [4567, 8901, 2345, 6789, 1234, 5678, 9876, 5432, 8765, 2345, 6789, 1234] },
            { name: "Product 2", data: [7890, 1234, 5678, 9876, 5432, 8765, 2345, 6789, 1234, 5678, 9876, 5432] },
          ],
        },
        {
          name: "Consumer 2A",
          data: [/* 12 values */],
          products: [
            { name: "Product 3", data: [/* 12 values */] },
            { name: "Product 4", data: [7890, 1234, 5678, 9876, 5432, 8765, 2345, 6789, 1234, 5678, 9876, 5432]  },
          ],
        },
      ],
    },
    {
      name: "Service B",
      data: [1178, 2287, 2245, 986, 224, 5123, 2435, 1987, 1376, 3245, 9876, 2324],
      consumers: [
        {
          name: "Consumer 1B",
          data: [1178, 2287, 2245, 986, 224, 5123, 2435, 1987, 1376, 3245, 9876, 2324],
          products: [
            { name: "Product 5", data: [/* 12 values */] },
            { name: "Product 6", data: [/* 12 values */] },
          ],
        },
        {
          name: "Consumer 2B",
          data: [/* 12 values */],
          products: [
            { name: "Product 7", data: [/* 12 values */] },
            { name: "Product 8", data: [/* 12 values */] },
          ],
        },
      ],
    },
  ]);

  const [selectedRange, setSelectedRange] = useState("MostService");
  const [selectedRangeConsumer, setSelectedRangeConsumer] = useState("MostConsumer");
  const [selectedRangeProduct, setSelectedRangeProduct] = useState("MostProduct");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const selectedServiceObject = selectedRange === "MostService" ? ServicesData.find((service) => service.name === MostService.name) : ServicesData.find((service) => service.name === selectedRange);
    const mostConsumerInService = MostServiceConsumer.find((service) => service.Service === selectedServiceObject?.name)?.consumer || "";
    const selectedConsumerObject = selectedRangeConsumer === "MostConsumer" ? selectedServiceObject?.consumers.find((consumer) => consumer.name === mostConsumerInService) : selectedServiceObject?.consumers.find((consumer) => consumer.name === selectedRangeConsumer);

    setFilteredProducts(selectedConsumerObject?.products || []);

    // Update selectedRangeConsumer and selectedRangeProduct when the selectedRange changes
    if (selectedRange === "MostService") {
      setSelectedRangeConsumer("MostConsumer");
    }
    if (selectedRangeConsumer === "MostConsumer") {
      setSelectedRangeProduct("MostProduct");
    }
  }, [selectedRange, selectedRangeConsumer, ServicesData, MostService, MostServiceConsumer]);

  const selectedServiceObject = selectedRange === "MostService" ? ServicesData.find((service) => service.name === MostService.name) : ServicesData.find((service) => service.name === selectedRange);
  const selectedData = selectedServiceObject?.data || [];
  const selectedService = selectedServiceObject?.name || "";

  const mostConsumerInService = MostServiceConsumer.find((service) => service.Service === selectedService)?.consumer || "";
  const selectedConsumerObject = selectedRangeConsumer === "MostConsumer" ? selectedServiceObject?.consumers.find((consumer) => consumer.name === mostConsumerInService) : selectedServiceObject?.consumers.find((consumer) => consumer.name === selectedRangeConsumer);
  const selectedConsumerData = selectedConsumerObject?.data || [];
  const selectedConsumerName = selectedConsumerObject?.name || "";

  const mostProductInConsumer = MostConsumerProduct.find((product) => product.consumer === selectedConsumerObject?.name)?.Product || "";
  const selectedProductObject = selectedRangeProduct === "MostProduct" ? selectedConsumerObject?.products.find((product) => product.name === mostProductInConsumer) : selectedConsumerObject?.products.find((product) => product.name === selectedRangeProduct);
  const selectedProductsData = selectedProductObject?.data || [];
  const selectedProductsName = selectedProductObject?.name || "";

  const handleChange = (e) => {
    setSelectedRange(e.target.value);
  };
  const handleChangeConsumer = (e) => {
    setSelectedRangeConsumer(e.target.value);
  };
  const handleChangeProduct = (e) => {
    setSelectedRangeProduct(e.target.value);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = selectedConsumerObject?.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts || []);
  };
  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
        <select
          value={selectedRange}
          onChange={handleChange}
          style={{
            padding: "2px",
            borderRadius: "20px",
            border: "1px solid #ced4da",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            fontSize: "12px",
            outline: "none",
            textAlign: "left",
            width: "150px",
            marginLeft: '250px',
            color: 'black'
          }}
        >
          <option value="MostService">MostService</option>
          {ServicesData.map((service) => (
            <option key={service.name} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        <Chart
          type="bar"
          width={400}
          height={400}
          series={[
            {
              name: "Total Products",
              data: selectedData,
            },
          ]}
          options={{
            title: {
              text: "Services",
              style: { fontSize: 20 },
            },
            subtitle: {
              text: selectedService,
              style: { fontSize: 16 },
            },
            colors: ["#FFA500"],
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
        <select
          value={selectedRangeConsumer}
          onChange={handleChangeConsumer}
          style={{
            padding: "2px",
            borderRadius: "20px",
            border: "1px solid #ced4da",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            fontSize: "12px",
            outline: "none",
            textAlign: "left",
            width: "150px",
            marginLeft: '250px',
            color: 'black'
          }}
        >
          <option value="MostConsumer">MostConsumer</option>
          {selectedServiceObject?.consumers.map((consumer) => (
            <option key={consumer.name} value={consumer.name}>
              {consumer.name}
            </option>
          ))}
        </select>
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
              text: "Consumers",
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
