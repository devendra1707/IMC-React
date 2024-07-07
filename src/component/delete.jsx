import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

export function DeleteComponent() {
    const [deleteResponse, setDelete] = useState(null)
    const [error, setError] = useState(null);
    const { idDelete } = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "delete",
                        url: `http://localhost:8080/delete/${idDelete}`,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        setDelete(response.data);
                        console.log("Data is deleted: " + response.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        navigate("/user");
                    }).catch((error) => {
                        alert("Something went wrong, please try again. Error: " + error);
                        setError(error);
                    });
                } else {
                    navigate("/user");
                }
            });
        }
    }, [idDelete, navigate, token]);

    return (
        <div className="container-fluid">
            {
                error ? (
                    <h3>Error occurred while deleting data. Please try again</h3>
                ) : (
                    <p>
                        {
                            deleteResponse ? (
                                <>
                                    <b>ID:</b> {deleteResponse.id}
                                </>
                            ) : (
                                <h3>Data deleted successfully...</h3>
                            )
                        }
                    </p>
                )
            }

            <p>
                <Link to="/user" className="text-decoration-none">Admin Panel</Link>
            </p>
        </div>
    )
}
