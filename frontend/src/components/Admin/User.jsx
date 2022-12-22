import { Component } from "react";
// import "./style_admin.css";
import SideBar from "./SideBar";
import { FaUser } from "react-icons/fa";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      id_user: this.props.match.params.id_user,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/admin/user")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data }, () => {
          console.log(this.state.user);
        });
      });
  }
  handleDelete(id_user) {
    console.log(id_user);
    fetch(`http://localhost:8000/admin/user/${id_user}`, {
      method: "DELETE",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_user),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ id_user: data }));
    window.location.href = "/admin-user";
  }

  render() {
    const movieElement = this.state.user?.map((user) => {
      return (
        <tbody>
          <tr>
            <td>{user.id_user}</td>
            <td>{user.name}</td>
            <td>{user.birth}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.password}</td>
            <td>
              <button
                type="reset"
                className="btn btn-warning btn-click"
                onClick={() => this.handleDelete(user.id_user)}
              >
                <span>Deleted</span>
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
    return (
      <div>
        <div className="Sidebar-container">
          <SideBar />
          <div
            className="user-section" style={{ background: "rgb(52 66 80)" }}
          >
            <div className="user-strpied-tabled-with-hover user-card">
              <div className="user-card-header">
                <h1 className="user-card-title" style={{ fontSize: "2rem" }}>
                  <FaUser style={{ fontSize: "25px", marginRight: "20px" }} />
                  USER
                </h1>
              </div>
              <div className="user-table-full-width user-table-responsive px-0 card-body">
                <table className="user-table-hover user-table-striped user-table">
                  <thead>
                    <tr>
                      <th className="user-nav">ID</th>
                      <th className="user-nav">Name</th>
                      <th className="user-nav">Birthday</th>
                      <th className="user-nav">Email</th>
                      <th className="user-nav">Phone Number</th>
                      <th className="user-nav">Password</th>
                      <th className="user-nav">Action</th>
                    </tr>
                  </thead>
                  {movieElement}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
