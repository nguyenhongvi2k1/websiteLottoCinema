import giave from "../../assets/img/giave.png";
import Banner from "../../components/shared/Banner";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import uudaiHS from "../../assets/img/uudai_hs.png";
import uudaiTV from "../../assets/img/uudai_thanhvien.png";
import uudaiT3 from "../../assets/img/uudai_thu3.png";
import Slider from "react-slick";
import { Component } from "react";

class GiaVe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
    };
  }
  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) });
    }
    fetch("http://localhost:8000/api/movies/playing/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data }, () => {
          console.log(this.state.movies);
        });
      });
  }
  getSlides() {
    return this.state.movies.map((movie) => (
      <div className="slide-movie-item">
        <div className="movie-item n_2d hide">
          <div className="movie-pic">
            <img src={movie.poster} className="lazyload" alt="poster" />
          </div>
          <div className="movie-txt">
            <h3>{movie.title} </h3>
          </div>
          <div className="movie-over">
            <p>{movie.content}</p>
            <span className="atc">...</span>
            <div className="flex flex-col align-items-center justify-content-center text-center bottom-0">
              <a href={`/phim/${movie.id}`} className="detail-link">
                Chi tiết
              </a>
              <a href={`/trailer/${movie.id}`} className="trailler-btn">
                Xem Trailer
              </a>
              <div className="border rounded-full bg-rose-500	 mt-5 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-amber-500 duration-300">
                <a
                  href={`/movie/${movie.id}`}
                  className="uppercase text-sm font-bold text-neutral-200	hover:text-white "
                >
                  Mua vé
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
    };
    const slides = this.getSlides();
    return (
      <>
        <Header user={this.state.user} />
        <Banner />
        <BuyTicket />
        <div className="container text-white mt-2">
          <div className="text-center m-5 ">
            <h2 className="font-bold uppercase text-4xl">Bảng giá vé</h2>
          </div>
          <div>
            <img src={giave} alt={"Bảng giá vé"} />
          </div>
          <div className="text-center item-center mt-5">
            <div className="text-center">
              <h2 className="text-3xl font-bold uppercase">Các phim HOT</h2>
            </div>
            <div className=" bg-gray-900">
              <div className="container pt-2">
                <div className="flex align-items-center justify-content-center">
                  <div className="pb-2 overflow-hidden">
                    <Slider {...settings}>{slides}</Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center item-center mt-5">
            <div className="container">
              <div className=" mt-5 mb-3">
                <div className="grid grid-flow-col auto-cols-max">
                  <div className="flex promotion-title align-items-start ">
                    <h2 className="origin-center -rotate-45 ">Ưu đãi</h2>
                  </div>
                  <div className="flex ">
                    <div className="max-w-sm promotion-item mr-2 ml-2">
                      <div className="promotion-pic">
                        <img className="lazyload" src={uudaiHS} alt="" />
                      </div>
                    </div>
                    <div className="max-w-sm promotion-item mr-2">
                      <div className="promotion-pic">
                        <img className="lazyload" src={uudaiT3} alt="" />
                      </div>
                    </div>
                    <div className="max-w-sm promotion-item">
                      <div className="promotion-pic">
                        <img className="lazyload" src={uudaiTV} alt="" />
                      </div>
                    </div>
                  </div>
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
export default GiaVe;
