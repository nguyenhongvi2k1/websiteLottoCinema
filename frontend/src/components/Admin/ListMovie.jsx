import { Component } from "react";
import "./style_admin.css";
import SideBar from "./SideBar";
import {
  FaFilm
} from "react-icons/fa";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      id_movie: this.props.match.params.id_movie,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/admin/select_movie")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data }, () => {
          console.log(this.state.movies);
        });
      });
  }
  handleDelete(id_movie) {
    console.log(id_movie);
    fetch(`http://localhost:8000/admin/select_movie/${id_movie}`, {
      method: "DELETE",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_movie),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ id_movie: data }));
    window.location.href = "/admin-movie";
  }
  handleEdit(id_movie) {
    console.log(id_movie);
    fetch(`http://localhost:8000/admin/show/addmovie/${id_movie}`, {
      method: "PUT",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_movie),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ id_movie: data }));
    window.location.href = "/admin-addmovie";
  }
  render() {
    const movieElement = this.state.movies?.map((movie) => {
      return (
        <tbody>
          <tr>
            <td>{movie.id_movie}</td>
            <td style={{ width: "300px" }}>
              <img className="img_admin" src={movie.image} />
            </td>
            <td>{movie.title}</td>
            <td>{movie.content}</td>
            {/* <td>
              <a href={movie.link}>Trailer</a>
            </td> */}
            <td>{movie.category}</td>
            <td>{movie.director}</td>
            <td>{movie.actor}</td>
            <td>{movie.time}</td>
            {/* <td>{movie.upcoming}</td> */}
            <td>
              <button
                type="submit"
                className="btn btn-primary start btn-click"
                onClick={() => this.handleEdit(movie.id_movie)}
              >
                <span>Edit</span>
              </button>

              <button
                type="submit"
                className="btn btn-warning cancel btn-click"
                onClick={() => this.handleDelete(movie.id_movie)}
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
                      <FaFilm
                        style={{ fontSize: "25px", marginRight: "20px" }}
                      />
                      MOVIE
                    </h1>
                  </div>
                  <div className="movie-table-full-width movie-table-responsive px-0 card-body">
                    <table className="movie-table-hover movie-table-striped movie-table">
                      <thead>
                        <tr>
                          <th className="movie-nav">ID</th>
                          <th className="movie-nav">Image</th>
                          <th className="movie-nav">Name</th>
                          <th className="movie-nav">Content</th>
                          {/* <th className="movie-nav">Link</th> */}
                          <th className="movie-nav">Category</th>
                          <th className="movie-nav">Director</th>
                          <th className="movie-nav">Actor</th>
                          <th className="movie-nav">Time</th>
                          {/* <th className="movie-nav">Upcoming</th> */}
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
