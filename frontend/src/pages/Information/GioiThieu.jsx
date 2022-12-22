import BuyTicket from "../../components/Buyticket/BuyTicket";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Component } from "react";
import introItem from "../../assets/img/intro-item-pic.jpg";
import intro1 from "../../assets/img/intro1.jpg";
import intro2 from "../../assets/img/intro2.jpg";
import intro3 from "../../assets/img/intro3.jpg";
import intro4 from "../../assets/img/intro4.jpg";
import intro5 from "../../assets/img/intro5.jpg";
import intro6 from "../../assets/img/intro6.jpg";
import uudaiHS from "../../assets/img/uudai_hs.png";
import uudaiTV from "../../assets/img/uudai_thanhvien.png";
import uudaiT3 from "../../assets/img/uudai_thu3.png";
import Banner from "../../components/shared/Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

class GioiThieu extends Component {
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
      <div>
        <Header user={this.state.user} />
        <Banner />
        <BuyTicket />
        <div className="container mt-5 text-white">
          <div className="text-white text-center ">
            <h2 className="text-4xl font-bold">Giới Thiệu</h2>
          </div>
          <div>
            <div className=" flex justify-center align-items-center -space-x-10 m-5">
              <div className="mix-blend-normal z-10 w-96 h-96">
                <img
                  className="rounded-full border-2 w-full h-full"
                  src={introItem}
                  alt="Lotto Cinema"
                />
              </div>
              <div className="mix-blend-normal flex flex-col">
                <div className="rounded-r-full bg-amber-500 p-4 ">
                  <h3 className="pl-6 font-bold text-4xl flex text-white">
                    Lotto Cinema
                  </h3>
                </div>
                <div className=" pl-12">
                  <p className="text-white">
                    Địa chỉ: Ký túc xá khu A, Đông Hòa, Dĩ An, Bình Dương
                  </p>
                  <p className="text-white">Hotline: (+84) 387 451 318</p>
                </div>
              </div>
            </div>

            <div className=" text-center mt-5 ">
              <p className="text-3xl font-bold ">
                LOTTO CINEMA, ĐIỂM ĐẾN GIẢI TRÍ TRẺ TRUNG VÀ SÔI ĐỘNG
              </p>
              <p className="flex item-center text-center justify-content-center">
                <FaQuoteLeft className="text-2xl text-amber-500" />
                <span className="text-xl m-2">
                  Đến LottoCinema để trải nghiệm những bộ phim điện ảnh đính
                  thực.
                </span>
                <FaQuoteRight className="text-2xl text-amber-500" />
              </p>
            </div>

            <div className="text-center mt-5">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold uppercase">
                  Một số hình ảnh của rạp Lotto Cinema
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4 item-center ">
                <div className="cinema-pic">
                  <img src={intro1} alt="" className="cinema-img" />
                </div>
                <div className="cinema-pic">
                  <img src={intro2} alt="" className="cinema-img" />
                </div>

                <div className="cinema-pic">
                  <img src={intro3} alt="" className="cinema-img" />
                </div>
                <div className="cinema-pic">
                  <img src={intro4} alt="" className="cinema-img" />
                </div>

                <div className="cinema-pic">
                  <img src={intro5} alt="" className="cinema-img" />
                </div>
                <div className="cinema-pic">
                  <img src={intro6} alt="" className="cinema-img" />
                </div>
              </div>
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
        </div>

        <Footer />
      </div>
    );
  }
}
export default GioiThieu;
