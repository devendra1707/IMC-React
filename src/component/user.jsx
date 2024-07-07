import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export function UserComponent() {
  const [incident, setIncident] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [login, setLogin] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [pageNumber, setPageNumber] = useState(0);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const itemsPerPage = 9;

  function logoutMethod() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    if (token) {
      axios({
        method: "get",
        url: "http://localhost:8080/incident",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setIncident(response.data);
          setFilteredAppointments(response.data);
          console.log(incident);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          navigate("/login");
        });
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("This is the localStorage Name : " + username);
    if (!username) {
      navigate("/login");
      return;
    }

    axios({
      method: "get",
      url: `http://localhost:8080/api/names/${username}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("this is the login details...");
        setLogin(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    const filterData = incident.filter((filterDatas) => {
      return (
        filterDatas.incidentId
          .toLowerCase()
          .includes(textSearch.toLowerCase()) ||
        filterDatas.enterpriseOrGovernment
          .toLowerCase()
          .includes(textSearch.toLowerCase()) ||
        filterDatas.reporterName
          .toLowerCase()
          .includes(textSearch.toLowerCase())
      );
    });
    setFilteredAppointments(filterData);
  }, [textSearch, incident]);

  const pageCount = Math.ceil(filteredAppointments.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const offset = pageNumber * itemsPerPage;
  const currentPageData = filteredAppointments.slice(
    offset,
    offset + itemsPerPage
  );

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
        <div className="container-fluid p-0">
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item m-1">
                <Link to="/addIncident" className="text-decoration-none">
                  <button className="btn btn-outline-info me-2">
                    Add Incident
                  </button>
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-3 w-100"
                type="search"
                placeholder="Search Name & Email & Specilization"
                aria-label="Search"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
              />
            </form>
            <ul className="navbar-nav">
              <li className="nav-item d-flex">
                <button
                  onClick={logoutMethod}
                  className="btn btn-outline-danger me-3"
                >
                  Logout
                </button>
                <td className="text-light mt-2 me-4 fw-bold fs-5">
                  <i class="bi bi-person-circle me-1"></i>
                  {login.userName}
                </td>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="" id="tablsCSS">
        <h3 className="text-info fw-bold" id="adminCSS">
          INCIDENT INFORMATION
        </h3>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Incident Id</th>
              <th>Reporter Name</th>
              <th>Incident Details</th>
              <th>Incidental Type</th>
              <th>Reposter Date Time</th>
              <th>Prority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {currentPageData.map((data) => (
              <tr key={data.id}>
                <td>{data.incidentId}</td>
                <td>{data.reporterName}</td>
                <td>{data.incidentDetails}</td>
                <td>{data.enterpriseOrGovernment}</td>
                <td>{data.reportedDateTime}</td>
                <td>{data.priority}</td>
                <td>{data.status}</td>
                <td>
                  <Link
                    to={`/update/incident/${data.incidentId}/${data.incidentDetails}/${data.reportedDateTime}/${data.priority}/${data.status}`}
                    className="text-decoration-none me-2"
                  >
                    <button className="btn btn-outline-secondary">
                      EDIT INCIDENT
                    </button>
                  </Link>
                  <Link to={`/delete/${data.id}`}>
                    <button className="btn btn-outline-danger me-5">
                      DELETE
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={
              <button className="btn btn-outline-dark m-2">Previous</button>
            }
            nextLabel={
              <button className="btn btn-outline-dark m-2">Next</button>
            }
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
