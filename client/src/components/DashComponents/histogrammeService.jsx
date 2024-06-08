import axios from "axios";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";


function Barchart() {
  const navigate = useNavigate();
  const [ServicesData, setServicesData] = useState([]);
  const [service,setService] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });

        try {
          const resp = await axios.get(
            `http://localhost:3036/services/${res.data.user.service_id}/`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
  
          setService(resp.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get(
            `http://localhost:3036/products/usage/${res.data.user.service_id}/service/1`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
  
          setData(resp.data.total.usage);
        } catch (error) {
          console.log(error);
        }
  
        try {
          const resp = await axios.get(
            `http://localhost:3036/services/${res.data.user.service_id}/users`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              withCredentials: true,
            }
          );
          setUsers(resp.data)
        } catch (error) {
          console.log(error);
        }
        try {
          const resp = await axios.get("http://localhost:3036/products", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setProducts(resp.data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        // If an error occurs, redirect to the login page
        navigate("/login");
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);
  const getProduct = (id) => {
    const pro = products.find((pro) => pro.product_id == id);
    if (pro) {
      return pro.name;
    } else {
      return "";
    }
  };
  const [MostService, setMostServicedata] = useState({
    name: "Service A",
    data: [
      6578, 6787, 3245, 9876, 2324, 5123, 2435, 1987, 1376, 3245, 9876, 2324,
    ],
  });

  const [MostServiceConsumer, setMostServiceConsumer] = useState([
    { Service: "Service A", consumer: "Consumer 1A" },
    { Service: "Service B", consumer: "Consumer 1B" },
  ]);

  const [MostConsumerProduct, setMostConsumerProduct] = useState([
    { consumer: "Consumer 1A", Product: "papier" },
    { consumer: "Consumer 2A", Product: "Product 4" },
  ]);

  const [selectedRange, setSelectedRange] = useState("MostService");
  const [selectedRangeConsumer, setSelectedRangeConsumer] =
    useState("MostConsumer");
  const [selectedRangeProduct, setSelectedRangeProduct] =
    useState("MostProduct");

  const selectedServiceObject =
    selectedRange === "MostService"
      ? ServicesData.find((service) => service.name === MostService.name)
      : ServicesData.find((service) => service.name === selectedRange);
  const selectedData = selectedServiceObject?.data || [];
  const selectedService = selectedServiceObject?.name || "";

  const mostConsumerInService =
    MostServiceConsumer.find((service) => service.Service === selectedService)
      ?.consumer || "";
  const selectedConsumerObject =
    selectedRangeConsumer === "MostConsumer"
      ? selectedServiceObject?.consumers.find(
          (consumer) => consumer.name === mostConsumerInService
        )
      : selectedServiceObject?.consumers.find(
          (consumer) => consumer.name === selectedRangeConsumer
        );
  const selectedConsumerData = selectedConsumerObject?.data || [];
  const selectedConsumerName = selectedConsumerObject?.name || "";

  const mostProductInConsumer =
    MostConsumerProduct.find(
      (product) => product.consumer === selectedConsumerObject?.name
    )?.Product || "";
  const selectedProductObject =
    selectedRangeProduct === "MostProduct"
      ? selectedConsumerObject?.products.find(
          (product) => product.name === mostProductInConsumer
        )
      : selectedConsumerObject?.products.find(
          (product) => product.name === selectedRangeProduct
        );
  const selectedProductsData = selectedProductObject?.data || [];
  const selectedProductsName = selectedProductObject?.name || "";
  const [consumerData, setConsumerData] = useState([]);

  const handleChangeConsumer = async (e) => {
    const user_id = e.target.value;
    console.log(selectedRange);
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.get(
          `http://localhost:3036/products/usage-user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );

        setConsumerData(resp.data.usage);
      } catch (error) {
        console.log(error);
      }

      try {
        const resp = await axios.get(
          `http://localhost:3036/products/consumed/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(resp.data);
        setProductsData(resp.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
    setSelectedRangeConsumer(user_id);
  };
  const handleChangeProduct = async (e) => {
    const id = e.target.value;
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.get(
          `http://localhost:3036/products/usage/${selectedRangeConsumer}/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        // setProductData(resp.data)
        setProductData(resp.data.consommation);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
    setSelectedRangeProduct(id);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = selectedConsumerObject?.products.filter(
      (product) => product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts || []);
  };
  console.log(productsData);
  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
        <h5>{service.name}</h5>
        <Chart
          type="bar"
          width={400}
          height={400}
          series={[
            {
              name: "Total Products",
              data: data,
            },
          ]}
          options={{
            title: {
              text: "service consommation",
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
            marginLeft: "250px",
            color: "black",
          }}
        >
          <option value="MostConsumer">MostConsumer</option>
          {users.map((consumer) => (
            <option key={consumer.user_id} value={consumer.user_id}>
              {consumer.firstname} {consumer.lastname}
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
              data: consumerData,
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
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Rechercher un produit"
            onChange={handleSearch}
            style={{
              padding: "2px",
              paddingLeft: "4px",
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
              color: "black",
            }}
          >
            <option value="MostProduct">MostProduct</option>
            {productsData.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {getProduct(product.product_id)}
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
              data: productData,
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
