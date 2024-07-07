import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./login.css";
import { useEffect, useState } from "react";

export function RegisterComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState({ city: "", country: "" });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      date: new Date().toISOString().split("T")[0],
      pinCode: "",
      city: "",
      country: "",
      contactNumber: "",
    },
    validationSchema: yup.object({
      userName: yup.string().required("User Name must be required..."),
      password: yup.string().required("Password must be required"),
      email: yup
        .string()
        .required("Please enter the email")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address"
        ),
      date: yup.date().required("Date must be required"),
      pinCode: yup.string().required("Pin Code is required"),
      city: yup.string().required("city is required"),
      country: yup.string().required("country is required"),
      contactNumber: yup.string().required("Phone number must be required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      axios({
        method: "post",
        url: "http://localhost:8080/api/create/tci/extio/create",
        data: values,
      })
        .then((response) => {
          console.log(response.data);
          navigate("/login");
          Swal.fire(
            "Thanks For Your Registration!",
            "Your data is submitted successfully...",
            "success"
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(
            "Incorrect Date Please Enter The Correct data" +
              error.response.error
          );

          if (error.response && error.response.status === 401) {
            alert("Enter invalid data please check once...");
          } else {
            alert("Something went wrong...");
          }

          setLoading(false);
        });
    },
  });
  const fetchLocation = async (pinCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pincode/${pinCode}`
      );
      if (response.data.Status === "Success") {
        const postOffice = response.data.PostOffice[0];
        setLocation({
          city: postOffice.District,
          country: postOffice.Country,
        });
        console.log(location);
        formik.setFieldValue("city", postOffice.District);
        formik.setFieldValue("country", postOffice.Country);
      } else {
        Swal.fire("Error", "Invalid pin code.", "error");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      Swal.fire(
        "Error",
        "Could not fetch location. Please try again.",
        "error"
      );
    }
  };

  useEffect(() => {
    if (formik.values.pinCode.length === 6) {
      fetchLocation(formik.values.pinCode);
    }
  }, [formik.values.pinCode]);

  return (
    <div className="container-fluid" id="registerCSS">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-6">
          <div className="card  p-4 shadow" id="registerCard">
            <h3 className="text-center fw-bold bg-light" id="headingImg">
              Register Here!
            </h3>
            <hr />

            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-row">
                <div className="form-floating me-2 flex-grow-1">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="form-control text-white"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Name"
                    value={formik.values.userName}
                  />
                  <label htmlFor="userName">UserName</label>
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className="text-danger">{formik.errors.userName}</div>
                  ) : null}
                </div>
                <div className="form-floating flex-grow-1">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter password"
                    value={formik.values.password}
                  />
                  <label htmlFor="password">Password</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-floating flex-grow-1 mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="aprajapati8081@gmail.com"
                  value={formik.values.email}
                />
                <label htmlFor="email">Email</label>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="d-flex flex-row mt-2">
                <div className="form-floating me-2 flex-grow-1">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter date"
                    value={formik.values.date}
                  />
                  <label htmlFor="date">Date</label>
                  {formik.touched.date && formik.errors.date ? (
                    <div className="text-danger">{formik.errors.date}</div>
                  ) : null}
                </div>
                <div className="form-floating me-2">
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Pin Code"
                    value={formik.values.dob}
                  />
                  <label htmlFor="pinCode">Pin Code</label>
                  {formik.touched.pinCode && formik.errors.pinCode ? (
                    <div className="text-danger">{formik.errors.pinCode}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-floating flex-grow-1 mt-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Address"
                  value={formik.values.city}
                />
                <label htmlFor="address">City</label>
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-danger">{formik.errors.city}</div>
                ) : null}
              </div>
              <div className="form-floating flex-grow-1 mt-2">
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter country"
                  value={formik.values.country}
                />
                <label htmlFor="address">Country</label>
                {formik.touched.country && formik.errors.country ? (
                  <div className="text-danger">{formik.errors.country}</div>
                ) : null}
              </div>
              <div className="form-floating flex-grow-1 mt-2">
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter phoneNumber"
                  value={formik.values.phoneNumber}
                />
                <label htmlFor="contactNumber">PhoneNumber</label>
                {formik.touched.contactNumber && formik.errors.contactNumber ? (
                  <div className="text-danger">
                    {formik.errors.contactNumber}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary mt-3 w-100"
              >
                Register
              </button>
              {loading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div
                    className="spinner-border text-danger fw-bold"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <span className="sr-only"></span>
                  </div>
                </div>
              )}
            </form>

            <p className="mt-2">
              <Link to="/" className="text-dark fw-bold text-decoration-none">
                Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
