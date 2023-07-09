import { Component } from "react";
import { toast } from "react-toastify";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Header from "../../components/Header/Header";
import Banner from "../../components/shared/Banner";
import Footer from "../../components/Footer/Footer";
import introItem from "../../assets/img/intro-item-pic.jpg";
import icon from "../../assets/img/icon-2d.png";

class Cards_Schedule_number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_showtimes: this.props.match.params.id_movie,
      user: null,
      showtime: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) });
    }
    fetch(
      `http://localhost:8000/api/getshowtime/?fk_movie=${this.state.id_showtimes}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ showtime: data }, () => {
          console.log(this.state.showtime);
        })
      );
  }
  onSubmit(id_movie, id_dayshowtime, id_time) {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      window.location.href = `/choose-user/${id_movie}?id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`;
    } else
      toast.warning(
        "Hãy đăng nhập để nhận được những ưu đãi tốt nhất từ LOTTO Cinema!!"
      );
  }
  render() {
    const movieElement = this.state.showtime
      ? this.state.showtime?.map((showtime) => {
          return (
            <div className="md:grid grid-flow-row-dense md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-2   mb-5  align-items-center">
              <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-2   bg-amber-600 rounded-sm shadow-lg h-auto">
                <img
                  className="border border-2 w-full"
                  src={showtime.fk_movie.poster}
                  alt="poster"
                />
                <div className="col-span-2 align-items-start">
                  <p>
                    <a
                      href={`/phim/${showtime.fk_movie.id}`}
                      className="text-white font-bold"
                    >
                      {showtime.fk_movie.title}
                    </a>
                  </p>
                  <p className="content_showtime">
                    <a
                      href={`/phim/${showtime.fk_movie.id}`}
                      className="text-white"
                    >
                      {showtime.fk_movie.content}
                    </a>
                  </p>
                  <img src={icon} alt="icon" />
                </div>
              </div>
              <div className="col-span-2 flex md:mt-0 mt-1 align-items-center">
                <div className="row-date-cards bg-yellow-500 rounded-bl-3xl rounded-tr-3xl">
                  <p className="my-7 mx-2 text-black font-bold lg:text-lg md:text-base text-sm ">
                    {showtime.fk_dayshowtimes.day_showtime}
                  </p>
                </div>
                <div className=" bg-gray-900 flex-1">
                  <ul className="m-2">
                    <button
                      className="bg-pink-900"
                      onClick={() =>
                        this.onSubmit(
                          showtime.fk_movie.id,
                          showtime.fk_dayshowtimes.id,
                          showtime.fk_dayshowtimes.fk_showtime.id
                        )
                      }
                    >
                      {showtime.fk_dayshowtimes.fk_showtime.time}
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          );
        })
      : null;
    return (
      <div>
        <Header user={this.state.user} />
        <Banner />
        <BuyTicket />
        <div className="container mt-5 text-white">
          <div className="flex justify-content-center align-items-center bg-emerald-900 text-center border border-2 rounded-r-full rounded-l-full">
            <span className="md:text-4xl text-xl font-bold uppercase text-white md:p-2 p-1">
              Lịch Chiếu
            </span>
          </div>
          <div className=" flex justify-center align-items-center -space-x-5 m-5">
            <div className="mix-blend-normal z-10 md:w-96 lg:w-96  w-32 md:h-96 lg:h-96 h-32">
              <img
                className="rounded-full border-2 w-full h-full"
                src={introItem}
                alt="Lotto Cinema"
              />
            </div>
            <div className="mix-blend-normal flex flex-col">
              <div className="rounded-r-full bg-amber-500 p-1 lg:p-4 ">
                <h3 className="pl-6 font-bold md:text-4xl text-lg flex text-white">
                  Lotto Cinema
                </h3>
              </div>
              <div className=" pl-12 md:block hidden ">
                <p className="text-white">
                  Địa chỉ: Ký túc xá khu A, Đông Hòa, Dĩ An, Bình Dương
                </p>
                <p className="text-white">Hotline: (+84) 387 451 318</p>
              </div>
            </div>
          </div>
          <div>{movieElement}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Cards_Schedule_number;
