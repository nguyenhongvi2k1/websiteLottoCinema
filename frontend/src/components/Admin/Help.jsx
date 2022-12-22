import { Component } from "react";
import "./style_admin.css";
import SideBar from "./SideBar";
import {
    FaQuestion
} from "react-icons/fa";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id_question: this.props.match.params.id_question,
    };
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/admin/help")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data }, () => {
          console.log(this.state.users);
        });
      });
  }
  handleDelete(id_question) {
    console.log(id_question);
    fetch(`http://localhost:8000/admin/help/${id_question}`, {
      method: "DELETE",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_question),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ id_question: data }));
    window.location.href = "/admin-dashboard";
  }
//   handleEdit(id_question) {
//     console.log(id_question);
//     fetch(`http://localhost:8000/admin/show/addmovie/${id_question}`, {
//       method: "PUT",
//       //headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(id_question),
//     })
//       .then((res) => res.json())
//       .then((data) => this.setState({ id_question: data }));
//     window.location.href = "/admin-dashboard";
//   }
  render() {
    const movieElement = this.state.users?.map((user) => {
      return (
        <tbody>
          <tr>
            <td>{user.id_question}</td>
            <td>{user.name_help}</td>
            <td>{user.email_help}</td>
            <td>{user.sdt}</td>
            <td>{user.text_help}</td>
            <td>{user.answer}</td>
            <td>
              <button
                type="submit"
                className="btn btn-primary start btn-click"
                onClick={() => this.handleEdit(user.id_question)}
              >
                <span>Edit</span>
              </button>

              <button
                type="submit"
                className="btn btn-warning cancel btn-click"
                onClick={() => this.handleDelete(user.id_question)}
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
        <div className="Sidebar-container"  style={{ background: "rgb(52 66 80)" }}>
          <SideBar />
          <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
              <div className="movie-section">
                <div className="movie-strpied-tabled-with-hover movie-card">
                  <div className="movie-card-header">
                    <h1
                      className="movie-card-title"
                      style={{ fontSize: "2rem" }}
                    >
                      <FaQuestion
                        style={{ fontSize: "25px", marginRight: "8px", marginTop: "-5px" }}
                      />
                      HELP
                    </h1>
                  </div>
                  <div className="movie-table-full-width movie-table-responsive px-0 card-body">
                    <table className="movie-table-hover movie-table-striped movie-table">
                      <thead>
                        <tr>
                          <th className="movie-nav">ID</th>
                          <th className="movie-nav">Name</th>
                          <th className="movie-nav">Email</th>
                          <th className="movie-nav">SĐT</th>
                          <th className="movie-nav">Text Question</th>
                          <th className="movie-nav">Text Answer</th>
                          <th className="movie-nav">Action</th>
                        </tr>
                      </thead>
                      {movieElement}
                    </table>
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

export default User;
