import Banner from "../../components/shared/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import uudaiHS from "../../assets/img/uudai_hs.png";
import uudaiTV from "../../assets/img/uudai_thanhvien.png";
import uudaiT3 from "../../assets/img/uudai_thu3.png";

class Home extends Component {
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
            <h3 className="md:text-lg text-base">{movie.title} </h3>
          </div>
          <div className="movie-over">
            <p className="md:text-base text-ms">{movie.content}</p>
            <span className="atc">...</span>
            <div className="flex flex-col align-items-center justify-content-center text-center bottom-0">
              <a href={`/phim/${movie.id}`} className="detail-link">
                Chi tiết
              </a>
              <a href={`/trailer/${movie.id}`} className="trailler-btn text-sm">
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
        <div className="container mt-3 mb-3 ">
          <div className="sub-tab text-center">
            <ul className="flex justify-center -space-x-14">
              <li className="mix-blend-normal rounded-r-full z-10  bg-yellow-400">
                <a
                  href="/phim_dang_chieu"
                  className="active rounded-r-full text-black cursor-auto text-sm md:text-2xl py-1 md:py-2 px-3 lg:px-6"
                >
                  Phim đang chiếu
                </a>
              </li>
              <li className="mix-blend-normal pl-10 rounded-r-full bg-amber-600">
                <a
                  href="/phim_sap_chieu"
                  className=" rounded-r-full text-sm md:text-2xl py-1 md:py-2 px-3 md:px-6"
                >
                  Phim sắp chiếu
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" bg-amber-600">
          <div className="container pt-2">
            <div className="flex align-items-center justify-content-center">
              <div className="pb-2 overflow-hidden">
                <Slider {...settings}>{slides}</Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" mt-5 mb-3">
            <div className="md:hidden flex text-xl font-bold  text-white justify-content-center align-items-center mr-2">
              <h2 className="uppercase origin-center font-bold">Ưu đãi</h2>
            </div>
            <div className="flex">
              <div className="md:flex hidden promotion-title align-items-start mr-2">
                <h2 className="origin-center -rotate-45 ">Ưu đãi</h2>
              </div>
              <div className="inline-grid grid-cols-3 gap-1 ml-2">
                <div className="promotion-item">
                  <div className="promotion-pic">
                    <img className="w-auto " src={uudaiHS} alt="" />
                  </div>
                </div>
                <div className="promotion-item ">
                  <div className="promotion-pic">
                    <img className="w-auto" src={uudaiT3} alt="" />
                  </div>
                </div>
                <div className="promotion-item">
                  <div className="promotion-pic">
                    <img className="w-auto" src={uudaiTV} alt="" />
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

export default Home;
