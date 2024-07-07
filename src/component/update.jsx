import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IncidentConstants } from "../constants/IncidentConstants";

export function UpdateIncident() {
  const [update, setUpdate] = useState({
    incidentId: "",
    incidentDetails: "individual",
    reportedDateTime: "",
    priority: "",
    status: "",
  });

  const [error, setError] = useState({
    incidentDetails: "",
    reportedDateTime: "",
    priority: "",
    status: "",
  });

  const navigate = useNavigate();
  const { incidentId } = useParams();
  const token = localStorage.getItem("token");
  const [isEditable, setIsEditable] = useState(true);
  const [incident, setIncident] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: value ? "" : `Must change the value of the field`,
    }));
  }

  useEffect(() => {
    if (token) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/incident/${incidentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const {
            incidentId,
            incidentDetails,
            reportedDateTime,
            priority,
            status,
          } = response.data;
          setUpdate({
            incidentId,
            incidentDetails: incidentDetails || "individual",
            reportedDateTime,
            priority,
            status,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to fetch incident details: " + error);
        });
    }
  }, [incidentId, token]);

  useEffect(() => {
    const fetchIncident = async () => {
      if (token) {
        try {
          const response = await axios({
            method: "get",
            url: `http://localhost:8080/api/incident/${incidentId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const incidentData = response.data;
          setIncident(incidentData);
          console.log("details", JSON.stringify(incidentData.status));
          setIsEditable(incidentData.status !== "CLOSED");
        } catch (error) {
          console.log(error);
          alert("Failed to fetch incident details: " + error);
        }
      }
    };
    fetchIncident();
  }, [incidentId, token]);
  //   useEffect(() => {
  //     if (token) {
  //       axios({
  //         method: "get",
  //         url: `http://localhost:8080/api/incident/${incidentId}`,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .then((response) => {
  //           const incidentData = response.data;
  //           setIncident(incidentData);
  //           console.log("details", JSON.stringify(incident.status));
  //           setIsEditable(incident.status !== "CLOSED");
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           alert("Failed to fetch incident details: " + error);
  //         });
  //     }
  //   }, [incidentId, token]);

  function handleSubmit(e) {
    e.preventDefault();

    if (incident.status === "CLOSED") {
      alert("Cannot update a closed incident.");
      return;
    }

    if (!token) {
      alert("No authorization token found. Please log in.");
      return;
    }

    // console.log("Token:", token);
    // console.log("Updating Incident with:", update);

    axios({
      method: "put",
      url: `http://localhost:8080/update/incident/${
        update.incidentId
      }/${encodeURIComponent(update.incidentDetails)}/${encodeURIComponent(
        update.reportedDateTime
      )}/${encodeURIComponent(update.priority)}/${encodeURIComponent(
        update.status
      )}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/user");
      })
      .catch((error) => {
        console.error("Error updating incident:", error);
        if (error.response && error.response.status === 401) {
          console.log(
            "Unauthorized: Invalid or expired token. Please log in again."
          );
        } else {
          console.log("Something went wrong: " + error.message);
          navigate("/user");
        }
      });
  }

  return (
    <div className="container-fluid" id="updateIncident">
      <div className="row mt-3 d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-6">
          <div className="card p-3 shadow rounded-4 bg-body-secondary">
            <h3 className="text-center fw-bold">Update Incident Details</h3>
            <hr />
            {incident.status === "CLOSED" && (
              <div className="alert alert-danger text-center">
                This incident is closed and cannot be edited.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <label htmlFor="incidentId">Incident ID</label>
                <input
                  type="text"
                  id="incidentId"
                  name="incidentId"
                  className="form-control"
                  value={update.incidentId}
                  readOnly
                />

                <div className="d-flex">
                  <label>Incident Details</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="incidentDetails"
                      id="individual"
                      value="individual"
                      checked={update.incidentDetails === "individual"}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                    <label className="form-check-label" htmlFor="individual">
                      Individual
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="incidentDetails"
                      id="enterprise"
                      value="enterprise"
                      checked={update.incidentDetails === "enterprise"}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                    <label className="form-check-label" htmlFor="enterprise">
                      Enterprise
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="incidentDetails"
                      id="government"
                      value="government"
                      checked={update.incidentDetails === "government"}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                    <label className="form-check-label" htmlFor="government">
                      Government
                    </label>
                  </div>
                  {error.incidentDetails && (
                    <div className="text-danger">{error.incidentDetails}</div>
                  )}
                </div>
                <label htmlFor="reportedDateTime">Reported Date Time</label>
                <input
                  type="text"
                  id="reportedDateTime"
                  name="reportedDateTime"
                  className="form-control"
                  value={update.reportedDateTime}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
                {error.reportedDateTime && (
                  <div className="text-danger">{error.reportedDateTime}</div>
                )}

                <label htmlFor="priority">Priority</label>
                <div className="form-group me-2 flex-grow-1 position-relative">
                  <select
                    id="priority"
                    name="priority"
                    className="form-control"
                    value={update.priority}
                    onChange={handleChange}
                    disabled={!isEditable}
                  >
                    <option value="">Select Priority</option>
                    {IncidentConstants.PRIORITIES.map((priority, index) => (
                      <option key={index} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                  {error.priority && (
                    <div className="text-danger">{error.priority}</div>
                  )}
                </div>
                <label htmlFor="status">Status</label>
                <div className="form-group me-2 flex-grow-1 position-relative">
                  <select
                    id="status"
                    name="status"
                    className="form-control"
                    value={update.status}
                    onChange={handleChange}
                    disabled={!isEditable}
                  >
                    <option value="">Select Status</option>
                    {IncidentConstants.STATUSES.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {error.status && (
                    <div className="text-danger">{error.status}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-outline-secondary mt-2 w-100"
              >
                Update
              </button>
            </form>

            <p>
              <Link to="/user" className="text-decoration-none m-2">
                Incident Panel
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
