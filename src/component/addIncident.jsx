import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { number } from "yup"
import Swal from "sweetalert2";
import * as yup from "yup"
import './login.css'
import { useState } from "react";

export function AddIncident() {

    const token = localStorage.getItem("token"); 
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            enterpriseOrGovernment: "",
            reporterName: "",
            incidentDetails: "",
            reportedDateTime: "",
            priority: "",
            status: ""
        },

        validationSchema: yup.object({
            enterpriseOrGovernment: yup.string().required("Enterprise type must be required..."),
            reporterName: yup.string().required("Reporter is requied"),
            incidentDetails: yup.string().required("Incident Details is Requied..."),
            reportedDateTime: yup.string().required("Local Date Time Is requied..."),
            priority: yup.string().required("Priority is requied to Enter"),
            status: yup.string().required("Status must be Requied..."),
           
        }),

        onSubmit: (values) => {
            setLoading(true)
            axios({
                method: "post",
                url: "http://localhost:8080/incident/create",
                headers: {
                    Authorization: `Bearer ${token}` 
                },
                data: values
            }).then((response) => {
                console.log(response.data);
                Swal.fire(
                    'Thanks For Your Registration!',
                    'Your data is submitted successfully...',
                    'success'
                )
                navigate("/user")
                setLoading(false)

            }).catch((error) => {
                console.error("There was an error submitting the form:", error);
                if (error.response) {
                    console.error("Server responded with:", error.response.data);
                    alert("Server error: " + error.response.data.message);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    alert("No response from server. Please try again later.");
                } else {
                    console.error("Error setting up request:", error.message);
                    alert("Error: " + error.message);
                }

                setLoading(false)
            });
        }
    })

    return (
        <div className="container-fluid" id="addDoctor">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-sm-6">
                    <div className="card  p-4 shadow" id="doctorRegister">
                        <h3 className="text-center fw-bold bg-light" id="registerHeading">Incident Details !!!</h3>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="d-flex flex-row">
                                <div className="form-floating me-2 flex-grow-1">
                                    <input type="text"
                                        id="enterpriseOrGovernment"
                                        name="enterpriseOrGovernment"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Name"
                                        value={formik.values.enterpriseOrGovernment} />
                                    <label htmlFor="enterpriseOrGovernment">Enterprice Type</label>
                                    {formik.touched.enterpriseOrGovernment && formik.errors.enterpriseOrGovernment ? (
                                        <div className="text-danger">{formik.errors.enterpriseOrGovernment}</div>
                                    ) : null}
                                </div>
                                <div className="form-floating flex-grow-1">
                                    <input type="text"
                                        id="reporterName"
                                        name="reporterName"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Reporter Name"
                                        value={formik.values.reporterName} />
                                    <label htmlFor="reporterName">Reporter Name</label>
                                    {formik.touched.reporterName && formik.errors.reporterName ? (
                                        <div className="text-danger">{formik.errors.reporterName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-floating flex-grow-1 mt-2">
                                <input type="text"
                                    id="incidentDetails"
                                    name="incidentDetails"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter Incident Details"
                                    value={formik.values.incidentDetails} />
                                <label htmlFor="incidentDetails">Incident Details</label>
                                {formik.touched.incidentDetails && formik.errors.incidentDetails ? (
                                    <div className="text-danger">{formik.errors.incidentDetails}</div>
                                ) : null}
                            </div>
                            <div className="d-flex row-flex mt-2">
                                <div className="form-floating me-2 flex-grow-1">
                                    <input type="date"
                                        id="reportedDateTime"
                                        name="reportedDateTime"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Date"
                                        value={formik.values.reportedDateTime} />
                                    <label htmlFor="reportedDateTime">Reported Time</label>
                                    {formik.touched.reportedDateTime && formik.errors.reportedDateTime ? (
                                        <div className="text-danger">{formik.errors.reportedDateTime}</div>
                                    ) : null}
                                </div>
                                <div className="form-floating me-2 flex-grow-1">
                                    <input type="text"
                                        id="priority"
                                        name="priority"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Date Of Birth"
                                        value={formik.values.priority} />
                                    <label htmlFor="priority">Priority</label>
                                    {formik.touched.priority && formik.errors.priority ? (
                                        <div className="text-danger">{formik.errors.priority}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-floating flex-grow-1 mt-2">
                                <input type="text"
                                    id="status"
                                    name="status"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter phoneNumber"
                                    value={formik.values.status} />
                                <label htmlFor="status">Status</label>
                                {formik.touched.status && formik.errors.status ? (
                                    <div className="text-danger">{formik.errors.status}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="btn btn-outline-primary mt-3 w-100">Register</button>
                        </form>
                        <p className="mt-2">
                            <Link to="/user" className="text-dark fw-bold text-decoration-none">Incident Details</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}