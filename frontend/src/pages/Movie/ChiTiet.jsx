import { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Banner from "../../components/shared/Banner";
import "bootstrap/dist/css/bootstrap.min.css";

class ChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_movie: this.props.match.params.id_movie,
      user: null,
    };
  }

  componentDidMount() {
    const id_movie = this.props.match.params.id_movie;
    fetch(`http://localhost:8000/api/movies/detail/${id_movie}`)
      .then((res) => res.json())
      .then((data) => this.setState({ id_movie: data }));
  }
  render() {
    return (
      <>
        <Header user={this.state.user} />
        <Banner />
        <BuyTicket />
        <div className="container mb-5">
          <div className="container mt-3 mb-3 ">
            <div className="sub-tab text-center">
              <ul className="flex justify-center -space-x-14">
                <li className="mix-blend-normal rounded-r-full z-10  bg-yellow-400">
                  <a
                    href="/phim_dang_chieu"
                    className="active rounded-r-full text-black cursor-auto"
                  >
                    Phim đang chiếu
                  </a>
                </li>
                <li className="mix-blend-normal pl-10 rounded-r-full bg-amber-600">
                  <a href="/phim_sap_chieu" className=" rounded-r-full ">
                    Phim sắp chiếu
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 bg-gray-900	rounded-lg">
            <div className="">
              <img
                src={this.state.id_movie.poster}
                alt="poster"
                className="film-item-pic w-auto"
              />
            </div>
            <div className="film-item-txt col-span-2 p-5">
              <h3>{this.state.id_movie.title}</h3>
              <div className="film-overview">
                <span className="l-title">Khởi chiếu:</span>
                <span className="l-value rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.date_premiere}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title">Thể loại:</span>
                <span className="l-value rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.category}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title">Diễn viên:</span>
                <span className="l-value rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.actor}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title">Đạo diễn:</span>
                <span className="l-value rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.director}
                </span>
              </div>
              <div className="film-item-type">
                <span className="icon-2d"></span>
              </div>
              <p>{this.state.id_movie.content}</p>
              <div className="w-full bottom-0">
                <div className=" text-center -space-x-10">
                  <a
                    href={`/trailer/${this.state.id_movie.id}`}
                    className="mix-blend-normal trailler-btn rounded-full w-25 justify-items-end text-slate-50 hover:text-slate-300 font-bold"
                  >
                    TRAILER
                  </a>
                  <a
                    href={`/movie/${this.state.id_movie.id}`}
                    className="mix-blend-normal cart-btn rounded-full w-25 text-slate-300 hover:text-slate-50"
                  >
                    MUA VÉ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ChiTiet;
