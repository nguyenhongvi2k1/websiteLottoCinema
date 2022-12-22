import { Component } from "react";
import {
  FaEnvelope,
  FaFilm,
  FaTh,
  FaUser,
  FaBell,
  FaPowerOff,
  FaTools,
  FaSearch,
} from "react-icons/fa";

import SideBar from "./SideBar";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count_user: 0,
      count_movie: 0,
    };
  }

  componentDidMount() { 
    fetch("http://localhost:8000/admin/count_user")
    .then((response) => response.json())
    .then((data) => {
      this.setState({ count_user: data }, () => {
        console.log(this.state.count_user);
      });
    });
    fetch("http://localhost:8000/admin/count_movie")
    .then((response) => response.json())
    .then((data) => {
      this.setState({ count_movie: data }, () => {
        console.log(this.state.count_movie);
      });
    });
  }
  render() {
    return (
      <div style={{ background: "#fff" }}>
        <div className="Sidebar-container">
          <SideBar />
          <div
            className="Sidebar-container"
            style={{ background: "rgb(52 66 80)" }}
          >
            <div className="Dashbroad-section">
              <div className="navbar-menu-wrapper ">
                <div
                  className="nav-item"
                  style={{
                    marginLeft: "30px",
                    marginTop: "18px",
                    backgroundColor: "transparent",
                    marginBottom: "auto",
                  }}
                >
                  <div className="dropdown">
                    <FaSearch
                      style={{ color: "whitesmoke", fontSize: "18px" }}
                    />
                  </div>
                </div>

                <ul
                  className="navbar-nav-right"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <li
                    className="nav-item"
                    style={{ backgroundColor: "transparent", width: "18px" }}
                  >
                    <div className="dropdown nav-link">
                      <FaEnvelope
                        style={{ color: "whitesmoke", fontSize: "18px" }}
                      />
                    </div>
                  </li>
                  <li
                    className="nav-item"
                    style={{ backgroundColor: "transparent", width: "18px" }}
                  >
                    <div className="dropdown nav-link">
                      <FaBell
                        style={{ color: "whitesmoke", fontSize: "18px" }}
                      />
                    </div>
                  </li>
                  <li
                    className="nav-item nav-logout d-none d-lg-block"
                    style={{ backgroundColor: "transparent", width: "18px" }}
                  >
                    <a className="nav-link" href="!#">
                      <FaPowerOff
                        style={{ color: "whitesmoke", fontSize: "18px" }}
                      />
                    </a>
                  </li>
                  <li
                    className="nav-item nav-settings d-none d-lg-block"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <a className="nav-link" href="!#">
                      <FaTools
                        style={{ color: "whitesmoke", fontSize: "18px" }}
                      />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="dashbroad-body">
                <div className="dashbroad-top">
                  <h2 className="header-dashbroad">
                    <FaTh style={{ fontSize: "22px", marginRight: "10px" }} />
                    Dashbroad
                  </h2>
                </div>
                <div className="dashbroad-row">
                  <div className=" card-dashbroad-cover grid-margin stretch-card">
                    <div
                      className="card-dashbroad"
                      style={{ background: "#2ab69f" }}
                    >
                      <div className="card-dashbroad-body">
                        <h2 className="header-text">
                          User{" "}
                          <FaUser
                            style={{ fontSize: "20px", marginLeft: "110px" }}
                          />
                        </h2>
                        <p className="text-muted-dashboard font-weight-normal">
                          <b>{this.state.count_user}</b> users
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" card-dashbroad-cover grid-margin stretch-card">
                    <div
                      className="card-dashbroad"
                      style={{ background: "#9D8ED9" }}
                    >
                      <div className="card-dashbroad-body">
                        <h2 className="header-text">
                          Movie
                          <FaFilm
                            style={{ fontSize: "20px", marginLeft: "100px" }}
                          />
                        </h2>
                        <p className="text-muted-dashboard font-weight-normal">
                          <b>{this.state.count_movie}</b> movies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
