import axios from "axios";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

function Barchart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3036/refresh", {
          withCredentials: true,
        });

        try {
          const resp = await axios.get("http://localhost:3036/products", {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          });
          setFilteredProducts(resp.data);
          setProducts(resp.data);
          console.log(resp.data);
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
  const [data, setData] = useState({});
  const [selectedRangeProduct, setSelectedRangeProduct] = useState();
  const [product, setProduct] = useState({});
  const handleChangeProduct = async (e) => {
    const id = e.target.value;
    try {
      const res = await axios.get("http://localhost:3036/refresh", {
        withCredentials: true,
      });
      try {
        const resp = await axios.get(
          `http://localhost:3036/products/usage/product/${id}/0`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setData(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const resp = await axios.get(`http://localhost:3036/products/${id}`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        setProduct(resp.data);
        console.log(resp.data);
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
    if (searchTerm.trim().length == 0) {
      setFilteredProducts(products);
      return;
    }
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts);
  };
  return (
    <React.Fragment>
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
            {filteredProducts?.map((product) => (
              <option key={product.product_id} value={product.product_id}>
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
              data: data.usage,
            },
          ]}
          options={{
            title: {
              text: "Products",
              style: { fontSize: 20 },
            },
            subtitle: {
              text: product.name,
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
