// Login.js
import React, { useState } from "react";
import "./log.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    validateField(name, value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (formIsValid()) {
      try {
        await axios
          .post(
            "http://localhost:3036/auth/login",
            {
              email: formData.email,
              password: formData.password,
            },
            { withCredentials: true }
          )
          .then((resp) => {
            console.log(resp.data);
            localStorage.setItem("accessToken", resp.data.accessToken);
            navigate("/users");
            setErr('')
          })
          .catch((err) => {
            setErr(err.response.data.error);
          });
      } catch (err) {
        alert("wrong credantials");
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  }

  const formIsValid = () => {
    return Object.values(formErrors).every((err) => err === "");
  };
  const validateEmail = (email) => {
    // Vérifie si l'e-mail se termine par "@esi-sba.dz"
    const domain = email.split("@")[1];
    return domain === "esi-sba.dz";
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "email":
        errors.email =
          !value || !validateEmail(value)
            ? "Please enter a valid email address"
            : "";
        break;
      case "password":
        errors.password = !value ? "Password is required" : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  return (
    <div className="container reset1 mt-5">
      <div className="reset-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="partie2">
          <div className="infos">
            <h2>Welcome Back!</h2>
            <p className="message">Please Login To Your Account</p>
          </div>
          <form>
            <div className="container user">
              <form >
                <div className="form-input">
                  <input
                  className="input_feild "
                    type="xx"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required="required"
                  />
                  <label htmlFor="email">Email </label>
                  {formErrors.email && (
                    <div className="error err-email">{formErrors.email}</div>
                  )}
                </div>
                <div className="form-input">
                  <input
                  className="input_feild "
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required="required"
                  />

                  <label htmlFor="password">Password</label>
                  {formErrors.password && (
                    <div className="error err-pass">{formErrors.password}</div>
                  )}
                </div>
              </form>
            </div>
            <Link to="/reset1" className="forgot">
              Forgot your password?
            </Link>
            <button onClick={handleSubmit} className="button">
              Submit
            </button>
          </form>
          {err && <span style={{ color: "red" }}>{err}</span>}
        </div>
      </div>
    </div>
  );
}

export default Login;
