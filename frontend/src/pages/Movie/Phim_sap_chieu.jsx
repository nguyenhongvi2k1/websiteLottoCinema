import React from "react";
import Banner from "../../components/shared/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BuyTicket from "../../components/Buyticket/BuyTicket";

class Phim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
    };
    this.updateMovieData = this.updateMovieData.bind(this);
  }

  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) });
    }
    fetch("http://localhost:8000/api/movies/coming/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data });
      });
  }
  updateMovieData(movies) {
    this.setState({ movies: movies }, () => {
      console.log(this.state.movies);
    });
  }

  render() {
    const movieElement = this.state.movies?.map((movie) => {
      return (
        <div className="p-2 film-item cl-purple grid grid-cols-2 gap-2">
          <div>
            <img
              className="film-item-pic img"
              src={movie.poster}
              alt="poster"
            />
          </div>
          <div className="film-item-txt flex flex-col justify-between">
            <div>
              <a
                href={`/phim/${movie.id}`}
                className="font-bold uppercase text-white text-2xl text-left"
              >
                {movie.title}
              </a>
              <a href={`/phim/${movie.id}`}>
                <p className="text-ellipsis content"> {movie.content}</p>
              </a>
            </div>
            <div className="film-item-but align-items-center text-center flex justify-center -space-x-10  ">
              <a
                href={`/trailer/${movie.id}`}
                className="mix-blend-normal trailler-btn rounded-full w-50 justify-items-end text-slate-50 hover:text-slate-300 font-bold"
              >
                TRAILER
              </a>
              <a
                href={`/movie/${movie.id}`}
                className="mix-blend-normal cart-btn rounded-full w-50 text-slate-300 hover:text-slate-50"
              >
                MUA VÉ
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header user={this.state.user} updateMovieData={this.updateMovieData} />
        <Banner />
        <BuyTicket />
        <div className="container mt-3 mb-3 ">
          <div className="sub-tab text-center">
            <ul className="flex justify-center -space-x-14">
              <li className="mix-blend-normal rounded-r-full z-10 bg-amber-600	">
                <a href="/phim_dang_chieu" className="rounded-r-full">
                  Phim đang chiếu
                </a>
              </li>
              <li className="mix-blend-normal pl-10 rounded-r-full bg-yellow-400">
                <a
                  href="/phim_sap_chieu"
                  className="active rounded-r-full text-black cursor-auto"
                >
                  Phim sắp chiếu
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container grid grid-cols-2 gap-2">{movieElement}</div>

        <Footer />
      </div>
    );
  }
}

export default Phim;
