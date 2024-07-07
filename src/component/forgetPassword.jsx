import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [forget, setForget] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForget((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: value ? "" : `Must change the value of the field`,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!forget.email || !forget.password || !forget.confirmPassword) {
      setError({
        email: forget.email ? "" : "Email is required",
        password: forget.password ? "" : "Password is required",
        confirmPassword: forget.confirmPassword
          ? ""
          : "Confirm Password is required",
      });
      return;
    }

    if (forget.password !== forget.confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    axios({
      method: "put",
      url: `http://localhost:8080/api/forget/${encodeURIComponent(
        forget.email
      )}/${encodeURIComponent(forget.password)}`,
    })
      .then((response) => {
        console.log("Password updated successfully:", response.data);
        alert("Password updated successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password: " + error.message);
      });
  };

  return (
    <div className="container-fluid" id="loginCSS">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-6">
          <div className="card p-4 shadow rounded-5" id="loginCard">
            <h3 className="text-center fw-bold" id="headingImg">
              Forget Password Here!
            </h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="mt-1">
                Email ID <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                id="email"
                className="form-control mt-1"
                onChange={handleChange}
                name="email"
                placeholder="Enter Email"
                value={forget.email}
              />
              {error.email && (
                <div className="text-danger fw-bold">{error.email}</div>
              )}

              <label htmlFor="password" className="mt-1">
                Password <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={handleChange}
                value={forget.password}
              />
              {error.password && (
                <div className="text-danger fw-bold">{error.password}</div>
              )}

              <label htmlFor="confirmPassword" className="mt-1">
                Confirm Password <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Enter Confirm Password"
                onChange={handleChange}
                value={forget.confirmPassword}
              />
              {error.confirmPassword && (
                <div className="text-danger fw-bold">
                  {error.confirmPassword}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-outline-success w-100 mt-3"
              >
                Forget Password
              </button>
              <p className="mt-2 d-flex justify-content-between">
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
