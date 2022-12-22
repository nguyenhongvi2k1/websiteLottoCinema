import React, { Component } from "react";
import Banner from "../../components/shared/Banner";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import uudai_hs from "../../assets/img/uudai_hs.png";
import uudai_thanhvien from "../../assets/img/uudai_thanhvien.png";
import uudai_thu3 from "../../assets/img/uudai_thu3.png";
import Slider from "react-slick";

class UuDai extends Component {
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
        <div className="container text-white mt-2">
          <div className="text-center m-5 ">
            <h2 className="font-bold uppercase text-4xl">CÁC ƯU ĐÃI</h2>
          </div>

          <div className=" w-full">
            <div className="flex flex-col-1 justify-center -space-x-14 w-full m-5">
              <div className="w-50 shadow-2xl mix-blend-normal z-10">
                <img
                  className="w-full border-2 shadow-2xl"
                  src={uudai_hs}
                  alt="banner uudai_hs"
                />
              </div>

              <div className=" bg-gray-800 px-24 py-16">
                <h3 className="">ƯU ĐÃI HỌC SINH - SINH VIÊN </h3>
                <p className="">
                  Áp dụng dành cho giáo viên, giảng viên, học sinh, sinh viên.{" "}
                  <br />
                  Ưu đãi giá vé xem phim chỉ 45,000đ/vé. <br />
                  LƯU Ý: <br />
                  - Vui lòng mua TRỰC TIẾP TẠI RẠP và xuất trình thẻ HSSV-GV
                  hoặc CMND có dán ảnh và còn hiệu lực khi mua vé. <br />
                  - Mỗi thẻ mua được một vé. <br />- Không áp dụng cho các ngày
                  Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim.
                </p>
              </div>
            </div>

            <div className="flex flex-col-1 justify-center -space-x-14 w-full m-5">
              <div className="w-50 shadow-2xl mix-blend-normal z-10">
                <img
                  className="w-full border-2 shadow-2xl"
                  src={uudai_thanhvien}
                  alt="banner uudai_thanhvien"
                />
              </div>
              <div className="bg-gray-800 px-24 py-16">
                <h3 className="">MỪNG THÀNH VIÊN MỚI</h3>
                <p className="">
                  - Giá vé ưu đãi: Giảm 25% cho đơn đặt vé đầu tiên ( bao gồm vé
                  + bắp nước ). <br />
                  - Đối tượng: dành cho khách hàng lần đầu đăng ký tài khoản
                  thanh toán online. <br />- Lưu ý: Không áp dụng cho các ngày
                  lễ/tết.
                </p>
              </div>
            </div>

            <div className="flex flex-col-1 justify-center -space-x-14 w-full m-5">
              <div className="w-50 shadow-2xl mix-blend-normal z-10">
                <img
                  className="w-full border-2 shadow-2xl"
                  src={uudai_thu3}
                  alt="banner uudai_thu3"
                />
              </div>
              <div className="bg-gray-800 px-24 py-16">
                <h3 className="">THỨ BA VUI VẺ </h3>
                <p className="">
                  - Giá vé ưu đãi: 50.000 đ/vé. <br />
                  - Thời gian: Áp dụng cho tất cả các suất chiếu ngày Thứ Ba
                  hàng tuần. <br />- Lưu ý: Không áp dụng cho các ngày lễ/tết.
                </p>
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
        </div>
        <Footer />
      </div>
    );
  }
}
export default UuDai;
