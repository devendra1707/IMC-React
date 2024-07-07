import { Link, useNavigate } from "react-router-dom";
import  './login.css';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export function LoginComponent() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: yup.object({
            userName: yup.string().required("User Name Must be Required"),
            password: yup.string().required("Password is Required"),
        }),
        onSubmit: (values) => {
            axios({
                method: "post",
                url: "http://localhost:8080/authentication",
                data: {
                    userName: values.userName,
                    password: values.password
                }
            }).then((response) => {
                const token = response.data.token;
                const user = response.data.user;
                const roles = user.roles;
                const role = roles.length > 0 ? roles[0].roleName : null;
    
                localStorage.setItem('token', token);
        
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('username', user.userName);
        
                if (role === "User") {
                    navigate("/user");
                } else {
                    navigate("/register");
                }
        
                Swal.fire(
                    'Welcome !',
                    'Thank you for Logging in Successfully...',
                    'success'
                );
            }).catch((error) => {
                console.log("Please Enter the Correct Data" + error.response);
                console.log(error);
        
                navigate("/unathorize");
                if (error.response && error.response.status === 401) {
                    alert("Please Enter The Correct User Name and Password");
                    navigate("/login");
                } else {
                    alert("Something went wrong...");
                    navigate("/login");
                }
            });
        }
        
    })

    return (
        <div className="container-fluid" id="loginCSS">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-sm-6">
                    <div className="card p-4 shadow rounded-5" id="loginCard">
                        <h3 className="text-center fw-bold" id="headingImg">Login Here!</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="userName" className="mt-1">UserName <span className="text-danger fw-bold">*</span></label>
                            <input type="text"
                                id="userName"
                                className="form-control mt-1"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="userName"
                                placeholder="Enter Name"
                                value={formik.values.userName} 
                                  />
                            {formik.touched.userName && formik.errors.userName ? (
                                <div className="text-danger fw-bold">{formik.errors.userName}</div>
                            ) : null}

                            <label htmlFor="password" className="mt-1">Password <span className="text-danger fw-bold">*</span></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger fw-bold">{formik.errors.password}</div>
                            ) : null}
                           
                            <button type="submit" className="btn btn-outline-success w-100 mt-3">Login Here</button>
                            <p className="mt-2 d-flex justify-content-between">
                                <Link to="/" className="text-decoration-none">Back_to_home</Link>
                                <Link className="text-decoration-none">Forget Password</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
