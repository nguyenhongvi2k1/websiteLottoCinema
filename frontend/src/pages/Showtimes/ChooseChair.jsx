import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import queryString from "query-string";

class ChooseChair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seat: [
        "A01",
        "A02",
        "A03",
        "A04",
        "A05",
        "A06",
        "A07",
        "A08",
        "A09",
        "A10",
        "A11",
        "A12",
        "B01",
        "B02",
        "B03",
        "B04",
        "B05",
        "B06",
        "B07",
        "B08",
        "B09",
        "B10",
        "B11",
        "B12",
        "C01",
        "C02",
        "C03",
        "C04",
        "C05",
        "C06",
        "C07",
        "C08",
        "C09",
        "C10",
        "C11",
        "C12",
        "D01",
        "D02",
        "D03",
        "D04",
        "D05",
        "D06",
        "D07",
        "D08",
        "D09",
        "D10",
        "D11",
        "D12",
        "E01",
        "E02",
        "E03",
        "E04",
        "E05",
        "E06",
        "E07",
        "E08",
        "E09",
        "E10",
        "E11",
        "E12",
        "F01",
        "F02",
        "F03",
        "F04",
        "F05",
        "F06",
        "F07",
        "F08",
        "F09",
        "F10",
        "F11",
        "F12",
        "G01",
        "G02",
        "G03",
        "G04",
        "G05",
        "G06",
        "G07",
        "G08",
        "G09",
        "G10",
        "G11",
        "G12",
        "H01",
        "H02",
        "H03",
        "H04",
        "H05",
        "H06",
        "H07",
        "H08",
        "H09",
        "H10",
        "H11",
        "H12",
        "J01",
        "J02",
        "J03",
        "J04",
        "J05",
        "J06",
        "J07",
        "J08",
        "J09",
        "J10",
        "J11",
        "J12",
        "K01",
        "K02",
        "K03",
        "K04",
        "K05",
        "K06",
        "K07",
        "K08",
        "K09",
        "K10",
        "K11",
        "K12",
      ],
      seatAvailable: [
        "A02",
        "A03",
        "A04",
        "A05",
        "A06",
        "A07",
        "A08",
        "A09",
        "A10",
        "A11",
        "A12",
        "B01",
        "B02",
        "B03",
        "B04",
        "B05",
        "B06",
        "B07",
        "B08",
        "B09",
        "B10",
        "B11",
        "B12",
        "C01",
        "C02",
        "C03",
        "C04",
        "C05",
        "C06",
        "C07",
        "C08",
        "C09",
        "C10",
        "C11",
        "C12",
        "D01",
        "D02",
        "D03",
        "D04",
        "D05",
        "D06",
        "D07",
        "D08",
        "D09",
        "D10",
        "D11",
        "D12",
        "E01",
        "E02",
        "E03",
        "E04",
        "E05",
        "E06",
        "E07",
        "E08",
        "E09",
        "E10",
        "E11",
        "E12",
        "F01",
        "F02",
        "F03",
        "F04",
        "F05",
        "F06",
        "F07",
        "F08",
        "F09",
        "F10",
        "F11",
        "F12",
        "G01",
        "G02",
        "G03",
        "G04",
        "G05",
        "G06",
        "G07",
        "G08",
        "G09",
        "G10",
        "G11",
        "G12",
        "H01",
        "H02",
        "H03",
        "H04",
        "H05",
        "H06",
        "H07",
        "H08",
        "H09",
        "H10",
        "H11",
        "H12",
        "J01",
        "J02",
        "J03",
        "J04",
        "J05",
        "J06",
        "J07",
        "J08",
        "J09",
        "J10",
        "J11",
        "J12",
        "K01",
        "K02",
        "K03",
        "K04",
        "K05",
        "K06",
        "K07",
        "K08",
        "K09",
        "K10",
        "K11",
        "K12",
      ],
      seatReserved: [], //danh sach dang chọn
      seatChoosed: [], //danh sach ghe da dat ve
      menu: this.props.location.search,
      user: null,
      id_user: null,
      showtime: [],
    };
    this.onClickData = this.onClickData.bind(this);
    this.checktrue = this.checktrue.bind(this);
    this.handleFood = this.handleFood.bind(this);
    this.handleSubmited = this.handleSubmited.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ id_user: JSON.parse(jsonStr) }, () => {
        console.log("vghvhg",this.state.id_user)
        fetch(
          `http://localhost:8000/api/getuser/?email=${this.state.id_user?.response?.email}`
        )
          .then((res) => res.json())
          .then((data) =>
            this.setState({ user: data }, () => {
              // console.log(data);
              // console.log(this.state.user);
            })
          );
      });
    }
    const id_movie = queryString.parse(this.state.menu).id_movie;
    const id_dayshowtime = queryString.parse(this.state.menu).id_dayshowtime;
    const id_time = queryString.parse(this.state.menu).id_time;
    // console.log(id_movie, id_dayshowtime, id_time);
    fetch(
      `http://localhost:8000/api/orderchair/?id_movie=${id_movie}&&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ showtime: data }, () => {
          // console.log(this.state.showtime);
        })
      );

    fetch(
      `http://localhost:8000/api/testchair/?id_movie=${id_movie}&&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        data.map((data) => {
          this.setState({
            seatChoosed: this.state.seatChoosed.concat(data.chair),
          });
        });
      });
  }
  handleBack(id_movie, id_dayshowtime, id_time) {
    window.location.href =
      window.location.href = `/choose-user/${id_movie}?id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`;
  }
  onClickData(seat) {
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter((res) => res !== seat),
      });
    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter((res) => res !== seat),
      });
    }
  }
  checktrue(row) {
    if (this.state.seatChoosed.indexOf(row) > -1) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmited(
    id_movie,
    id_dayshowtime,
    id_time,
    quantity_ticket,
    summary,
    chair,
    id_food,
    food
  ) {
    window.location.href = `/payment?id_user=${this.state.user[0]?.id}&id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${id_food}&food=${food}`;
  }
  handleFood(
    id_movie,
    id_dayshowtime,
    id_time,
    quantity_ticket,
    summary,
    chair
  ) {
    window.location.href = `/food?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}`;
  }
  render() {
    const componet = this.state.showtime?.map((showtime) => {
      return (
        <div className="container ">
          <div className="order-title mb-2">
            <div className="flex flex-col items-center justify-content-center ">
              <div className="w-full text-end">
                <button
                  className="close-order w-10"
                  onClick={() => this.handleBack(showtime?.fk_movie?.id)}
                ></button>
              </div>
              <div>
                <div className=" flex">
                  <span className="text-white uppercase">Tên phim:</span>
                  <p className="md:text-2xl text-xl font-bold text-orange-500 ml-5 uppercase">
                    {showtime?.fk_movie?.title}
                  </p>
                </div>
                <table className="border-collapse border border-slate-400 w-100">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 text-center  text-base font-sans text-gray-200 bg-gray-900">
                        Suất chiếu
                      </th>
                      <th className="border border-slate-300 text-center  text-base font-sans text-gray-200 bg-gray-900">
                        Ngày
                      </th>
                      <th className="border border-slate-300 text-center  text-base font-sans text-gray-200 bg-gray-900">
                        Số lượng
                      </th>
                      <th className="border border-slate-300 text-center text-base font-sans text-gray-200 bg-gray-900">
                        Tổng số tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 text-center text-center font-serif text-gray-200 bg-gray-900">
                        {showtime?.fk_dayshowtimes?.fk_showtime?.time}
                      </td>
                      <td className="border border-slate-300 text-center text-center font-serif text-gray-200 bg-gray-900">
                        {showtime?.fk_dayshowtimes?.day_showtime}
                      </td>
                      <td className="border border-slate-300 text-center text-center font-serif text-gray-200 bg-gray-900">
                        <span>
                          {queryString.parse(this.state.menu).quantity_ticket}
                        </span>
                        <span> vé</span>
                      </td>
                      <td className="border border-slate-300 text-center text-center font-serif text-gray-200 bg-gray-900">
                        <span>
                          {queryString.parse(this.state.menu).summary}
                        </span>

                        <sup>đ</sup>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 text-center text-center font-sans text-gray-200 bg-gray-900">
                        Số ghế
                      </td>
                      <span className="text-center text-center font-serif text-gray-200 bg-gray-900"></span>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="order-content">
            <div className="flex  justify-content-center">
              <div className="flex justify-content-center w-75 cinema-name p-2 my-2 rounded-r-full rounded-l-full">
                <h2 className="lg:text-3xl md:text-2xl text-xl mb-0">
                  Lotto Cinema
                </h2>
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-content-center w-100">
                <div className=" bg-gray-50 md:px-5 px-0 rounded-lg">
                  <div className="flex justify-content-center ">
                    <div className="w-50 p-2 my-2">
                      <h3 className="cinema-title text-base md:text-xl">
                        Màn hình
                      </h3>
                    </div>
                  </div>
                  <div className="cinema-wrap ">
                    <div className="cinema-seat ">
                      <div className="seat-container grid grid-cols-12 gap-1">
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[0]) >
                            -1
                              ? "singleChooosed md:w-11 w-8  h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[0]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[0]}
                          onClick={
                            this.checktrue(this.state.seat[0])
                              ? (e) => this.onClickData(this.state.seat[0])
                              : null
                          }
                        >
                          {this.state.seat[0]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[1]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center w-8"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[1]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[1]}
                          onClick={
                            this.checktrue(this.state.seat[1])
                              ? (e) => this.onClickData(this.state.seat[1])
                              : null
                          }
                        >
                          {this.state.seat[1]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[2]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[2]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[2]}
                          onClick={
                            this.checktrue(this.state.seat[2])
                              ? (e) => this.onClickData(this.state.seat[2])
                              : null
                          }
                        >
                          {this.state.seat[2]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[3]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[3]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[3]}
                          onClick={
                            this.checktrue(this.state.seat[3])
                              ? (e) => this.onClickData(this.state.seat[3])
                              : null
                          }
                        >
                          {this.state.seat[3]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[4]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[4]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[4]}
                          onClick={
                            this.checktrue(this.state.seat[4])
                              ? (e) => this.onClickData(this.state.seat[4])
                              : null
                          }
                        >
                          {this.state.seat[4]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[5]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[5]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[5]}
                          onClick={
                            this.checktrue(this.state.seat[5])
                              ? (e) => this.onClickData(this.state.seat[5])
                              : null
                          }
                        >
                          {this.state.seat[5]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[6]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[6]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[6]}
                          onClick={
                            this.checktrue(this.state.seat[6])
                              ? (e) => this.onClickData(this.state.seat[6])
                              : null
                          }
                        >
                          {this.state.seat[6]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[7]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[7]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[7]}
                          onClick={
                            this.checktrue(this.state.seat[7])
                              ? (e) => this.onClickData(this.state.seat[7])
                              : null
                          }
                        >
                          {this.state.seat[7]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[8]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[8]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[8]}
                          onClick={
                            this.checktrue(this.state.seat[8])
                              ? (e) => this.onClickData(this.state.seat[8])
                              : null
                          }
                        >
                          {this.state.seat[8]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(this.state.seat[9]) >
                            -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[9]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[9]}
                          onClick={
                            this.checktrue(this.state.seat[9])
                              ? (e) => this.onClickData(this.state.seat[9])
                              : null
                          }
                        >
                          {this.state.seat[9]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[10]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[10]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[10]}
                          onClick={
                            this.checktrue(this.state.seat[10])
                              ? (e) => this.onClickData(this.state.seat[10])
                              : null
                          }
                        >
                          {this.state.seat[10]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[11]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[11]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[11]}
                          onClick={
                            this.checktrue(this.state.seat[11])
                              ? (e) => this.onClickData(this.state.seat[11])
                              : null
                          }
                        >
                          {this.state.seat[11]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[12]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[12]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[12]}
                          onClick={
                            this.checktrue(this.state.seat[12])
                              ? (e) => this.onClickData(this.state.seat[12])
                              : null
                          }
                        >
                          {this.state.seat[12]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[13]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[13]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[13]}
                          onClick={
                            this.checktrue(this.state.seat[13])
                              ? (e) => this.onClickData(this.state.seat[13])
                              : null
                          }
                        >
                          {this.state.seat[13]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[14]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[14]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[14]}
                          onClick={
                            this.checktrue(this.state.seat[14])
                              ? (e) => this.onClickData(this.state.seat[14])
                              : null
                          }
                        >
                          {this.state.seat[14]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[15]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[15]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[15]}
                          onClick={
                            this.checktrue(this.state.seat[15])
                              ? (e) => this.onClickData(this.state.seat[15])
                              : null
                          }
                        >
                          {this.state.seat[15]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[16]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[16]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[16]}
                          onClick={
                            this.checktrue(this.state.seat[16])
                              ? (e) => this.onClickData(this.state.seat[16])
                              : null
                          }
                        >
                          {this.state.seat[16]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[17]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[17]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[17]}
                          onClick={
                            this.checktrue(this.state.seat[17])
                              ? (e) => this.onClickData(this.state.seat[17])
                              : null
                          }
                        >
                          {this.state.seat[17]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[18]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[18]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[18]}
                          onClick={
                            this.checktrue(this.state.seat[18])
                              ? (e) => this.onClickData(this.state.seat[18])
                              : null
                          }
                        >
                          {this.state.seat[18]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[19]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[19]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[19]}
                          onClick={
                            this.checktrue(this.state.seat[19])
                              ? (e) => this.onClickData(this.state.seat[19])
                              : null
                          }
                        >
                          {this.state.seat[19]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[20]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[20]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[20]}
                          onClick={
                            this.checktrue(this.state.seat[20])
                              ? (e) => this.onClickData(this.state.seat[20])
                              : null
                          }
                        >
                          {this.state.seat[20]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[21]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[21]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[21]}
                          onClick={
                            this.checktrue(this.state.seat[21])
                              ? (e) => this.onClickData(this.state.seat[21])
                              : null
                          }
                        >
                          {this.state.seat[21]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[22]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[22]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[22]}
                          onClick={
                            this.checktrue(this.state.seat[22])
                              ? (e) => this.onClickData(this.state.seat[22])
                              : null
                          }
                        >
                          {this.state.seat[22]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[23]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[23]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[23]}
                          onClick={
                            this.checktrue(this.state.seat[23])
                              ? (e) => this.onClickData(this.state.seat[23])
                              : null
                          }
                        >
                          {this.state.seat[23]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[24]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[24]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[24]}
                          onClick={
                            this.checktrue(this.state.seat[24])
                              ? (e) => this.onClickData(this.state.seat[24])
                              : null
                          }
                        >
                          {this.state.seat[24]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[25]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[25]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[25]}
                          onClick={
                            this.checktrue(this.state.seat[25])
                              ? (e) => this.onClickData(this.state.seat[25])
                              : null
                          }
                        >
                          {this.state.seat[25]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[26]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[26]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[26]}
                          onClick={
                            this.checktrue(this.state.seat[26])
                              ? (e) => this.onClickData(this.state.seat[26])
                              : null
                          }
                        >
                          {this.state.seat[26]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[27]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[27]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[27]}
                          onClick={
                            this.checktrue(this.state.seat[27])
                              ? (e) => this.onClickData(this.state.seat[27])
                              : null
                          }
                        >
                          {this.state.seat[27]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[28]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[28]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[28]}
                          onClick={
                            this.checktrue(this.state.seat[28])
                              ? (e) => this.onClickData(this.state.seat[28])
                              : null
                          }
                        >
                          {this.state.seat[28]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[29]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[29]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[29]}
                          onClick={
                            this.checktrue(this.state.seat[29])
                              ? (e) => this.onClickData(this.state.seat[29])
                              : null
                          }
                        >
                          {this.state.seat[29]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[30]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[30]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[30]}
                          onClick={
                            this.checktrue(this.state.seat[30])
                              ? (e) => this.onClickData(this.state.seat[30])
                              : null
                          }
                        >
                          {this.state.seat[30]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[31]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[31]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[31]}
                          onClick={
                            this.checktrue(this.state.seat[31])
                              ? (e) => this.onClickData(this.state.seat[31])
                              : null
                          }
                        >
                          {this.state.seat[31]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[32]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[32]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[32]}
                          onClick={
                            this.checktrue(this.state.seat[32])
                              ? (e) => this.onClickData(this.state.seat[32])
                              : null
                          }
                        >
                          {this.state.seat[32]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[33]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[33]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[33]}
                          onClick={
                            this.checktrue(this.state.seat[33])
                              ? (e) => this.onClickData(this.state.seat[33])
                              : null
                          }
                        >
                          {this.state.seat[33]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[34]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[34]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[34]}
                          onClick={
                            this.checktrue(this.state.seat[34])
                              ? (e) => this.onClickData(this.state.seat[34])
                              : null
                          }
                        >
                          {this.state.seat[34]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[35]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[35]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[35]}
                          onClick={
                            this.checktrue(this.state.seat[35])
                              ? (e) => this.onClickData(this.state.seat[35])
                              : null
                          }
                        >
                          {this.state.seat[35]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[36]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[36]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[36]}
                          onClick={
                            this.checktrue(this.state.seat[36])
                              ? (e) => this.onClickData(this.state.seat[36])
                              : null
                          }
                        >
                          {this.state.seat[36]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[37]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[37]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[37]}
                          onClick={
                            this.checktrue(this.state.seat[37])
                              ? (e) => this.onClickData(this.state.seat[37])
                              : null
                          }
                        >
                          {this.state.seat[37]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[38]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[38]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[38]}
                          onClick={
                            this.checktrue(this.state.seat[38])
                              ? (e) => this.onClickData(this.state.seat[38])
                              : null
                          }
                        >
                          {this.state.seat[38]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[39]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[39]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[39]}
                          onClick={
                            this.checktrue(this.state.seat[39])
                              ? (e) => this.onClickData(this.state.seat[39])
                              : null
                          }
                        >
                          {this.state.seat[39]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[40]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[40]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[40]}
                          onClick={
                            this.checktrue(this.state.seat[40])
                              ? (e) => this.onClickData(this.state.seat[40])
                              : null
                          }
                        >
                          {this.state.seat[40]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[41]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[41]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[41]}
                          onClick={
                            this.checktrue(this.state.seat[41])
                              ? (e) => this.onClickData(this.state.seat[41])
                              : null
                          }
                        >
                          {this.state.seat[41]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[42]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[42]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[42]}
                          onClick={
                            this.checktrue(this.state.seat[42])
                              ? (e) => this.onClickData(this.state.seat[42])
                              : null
                          }
                        >
                          {this.state.seat[42]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[43]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[43]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[43]}
                          onClick={
                            this.checktrue(this.state.seat[43])
                              ? (e) => this.onClickData(this.state.seat[43])
                              : null
                          }
                        >
                          {this.state.seat[43]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[44]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[44]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[44]}
                          onClick={
                            this.checktrue(this.state.seat[44])
                              ? (e) => this.onClickData(this.state.seat[44])
                              : null
                          }
                        >
                          {this.state.seat[44]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[45]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[45]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[45]}
                          onClick={
                            this.checktrue(this.state.seat[45])
                              ? (e) => this.onClickData(this.state.seat[45])
                              : null
                          }
                        >
                          {this.state.seat[45]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[46]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[46]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[46]}
                          onClick={
                            this.checktrue(this.state.seat[46])
                              ? (e) => this.onClickData(this.state.seat[46])
                              : null
                          }
                        >
                          {this.state.seat[46]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[47]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[47]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[47]}
                          onClick={
                            this.checktrue(this.state.seat[47])
                              ? (e) => this.onClickData(this.state.seat[47])
                              : null
                          }
                        >
                          {this.state.seat[47]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[48]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[48]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[48]}
                          onClick={
                            this.checktrue(this.state.seat[48])
                              ? (e) => this.onClickData(this.state.seat[48])
                              : null
                          }
                        >
                          {this.state.seat[48]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[49]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[49]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[49]}
                          onClick={
                            this.checktrue(this.state.seat[49])
                              ? (e) => this.onClickData(this.state.seat[49])
                              : null
                          }
                        >
                          {this.state.seat[49]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[50]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[50]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[50]}
                          onClick={
                            this.checktrue(this.state.seat[50])
                              ? (e) => this.onClickData(this.state.seat[50])
                              : null
                          }
                        >
                          {this.state.seat[50]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[51]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[51]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[51]}
                          onClick={
                            this.checktrue(this.state.seat[51])
                              ? (e) => this.onClickData(this.state.seat[51])
                              : null
                          }
                        >
                          {this.state.seat[51]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[52]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[52]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[52]}
                          onClick={
                            this.checktrue(this.state.seat[52])
                              ? (e) => this.onClickData(this.state.seat[52])
                              : null
                          }
                        >
                          {this.state.seat[52]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[53]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[53]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[53]}
                          onClick={
                            this.checktrue(this.state.seat[53])
                              ? (e) => this.onClickData(this.state.seat[53])
                              : null
                          }
                        >
                          {this.state.seat[53]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[54]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[54]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[54]}
                          onClick={
                            this.checktrue(this.state.seat[54])
                              ? (e) => this.onClickData(this.state.seat[54])
                              : null
                          }
                        >
                          {this.state.seat[54]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[55]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[55]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[55]}
                          onClick={
                            this.checktrue(this.state.seat[55])
                              ? (e) => this.onClickData(this.state.seat[55])
                              : null
                          }
                        >
                          {this.state.seat[55]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[56]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[56]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[56]}
                          onClick={
                            this.checktrue(this.state.seat[56])
                              ? (e) => this.onClickData(this.state.seat[56])
                              : null
                          }
                        >
                          {this.state.seat[56]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[57]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[57]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[57]}
                          onClick={
                            this.checktrue(this.state.seat[57])
                              ? (e) => this.onClickData(this.state.seat[57])
                              : null
                          }
                        >
                          {this.state.seat[57]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[58]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[58]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[58]}
                          onClick={
                            this.checktrue(this.state.seat[58])
                              ? (e) => this.onClickData(this.state.seat[58])
                              : null
                          }
                        >
                          {this.state.seat[58]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[59]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[59]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[59]}
                          onClick={
                            this.checktrue(this.state.seat[59])
                              ? (e) => this.onClickData(this.state.seat[59])
                              : null
                          }
                        >
                          {this.state.seat[59]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[60]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[60]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[60]}
                          onClick={
                            this.checktrue(this.state.seat[60])
                              ? (e) => this.onClickData(this.state.seat[60])
                              : null
                          }
                        >
                          {this.state.seat[60]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[61]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[61]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[61]}
                          onClick={
                            this.checktrue(this.state.seat[61])
                              ? (e) => this.onClickData(this.state.seat[61])
                              : null
                          }
                        >
                          {this.state.seat[61]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[62]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[62]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[62]}
                          onClick={
                            this.checktrue(this.state.seat[62])
                              ? (e) => this.onClickData(this.state.seat[62])
                              : null
                          }
                        >
                          {this.state.seat[62]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[63]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[63]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[63]}
                          onClick={
                            this.checktrue(this.state.seat[63])
                              ? (e) => this.onClickData(this.state.seat[63])
                              : null
                          }
                        >
                          {this.state.seat[63]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[64]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[64]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[64]}
                          onClick={
                            this.checktrue(this.state.seat[64])
                              ? (e) => this.onClickData(this.state.seat[64])
                              : null
                          }
                        >
                          {this.state.seat[64]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[65]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[65]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[65]}
                          onClick={
                            this.checktrue(this.state.seat[65])
                              ? (e) => this.onClickData(this.state.seat[65])
                              : null
                          }
                        >
                          {this.state.seat[65]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[66]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[66]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[66]}
                          onClick={
                            this.checktrue(this.state.seat[66])
                              ? (e) => this.onClickData(this.state.seat[66])
                              : null
                          }
                        >
                          {this.state.seat[66]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[67]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[67]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[67]}
                          onClick={
                            this.checktrue(this.state.seat[67])
                              ? (e) => this.onClickData(this.state.seat[67])
                              : null
                          }
                        >
                          {this.state.seat[67]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[68]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[68]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[68]}
                          onClick={
                            this.checktrue(this.state.seat[68])
                              ? (e) => this.onClickData(this.state.seat[68])
                              : null
                          }
                        >
                          {this.state.seat[68]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[69]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[69]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[69]}
                          onClick={
                            this.checktrue(this.state.seat[69])
                              ? (e) => this.onClickData(this.state.seat[69])
                              : null
                          }
                        >
                          {this.state.seat[69]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[70]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[70]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[70]}
                          onClick={
                            this.checktrue(this.state.seat[70])
                              ? (e) => this.onClickData(this.state.seat[70])
                              : null
                          }
                        >
                          {this.state.seat[70]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[71]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[71]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[71]}
                          onClick={
                            this.checktrue(this.state.seat[71])
                              ? (e) => this.onClickData(this.state.seat[71])
                              : null
                          }
                        >
                          {this.state.seat[71]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[72]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[72]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[72]}
                          onClick={
                            this.checktrue(this.state.seat[72])
                              ? (e) => this.onClickData(this.state.seat[72])
                              : null
                          }
                        >
                          {this.state.seat[72]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[73]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[73]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[73]}
                          onClick={
                            this.checktrue(this.state.seat[73])
                              ? (e) => this.onClickData(this.state.seat[73])
                              : null
                          }
                        >
                          {this.state.seat[73]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[74]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[74]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[74]}
                          onClick={
                            this.checktrue(this.state.seat[74])
                              ? (e) => this.onClickData(this.state.seat[74])
                              : null
                          }
                        >
                          {this.state.seat[74]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[75]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[75]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[75]}
                          onClick={
                            this.checktrue(this.state.seat[75])
                              ? (e) => this.onClickData(this.state.seat[75])
                              : null
                          }
                        >
                          {this.state.seat[75]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[76]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[76]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[76]}
                          onClick={
                            this.checktrue(this.state.seat[76])
                              ? (e) => this.onClickData(this.state.seat[76])
                              : null
                          }
                        >
                          {this.state.seat[76]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[77]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[77]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[77]}
                          onClick={
                            this.checktrue(this.state.seat[77])
                              ? (e) => this.onClickData(this.state.seat[77])
                              : null
                          }
                        >
                          {this.state.seat[77]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[78]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[78]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[78]}
                          onClick={
                            this.checktrue(this.state.seat[78])
                              ? (e) => this.onClickData(this.state.seat[78])
                              : null
                          }
                        >
                          {this.state.seat[78]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[79]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[79]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[79]}
                          onClick={
                            this.checktrue(this.state.seat[79])
                              ? (e) => this.onClickData(this.state.seat[79])
                              : null
                          }
                        >
                          {this.state.seat[79]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[80]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[80]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[80]}
                          onClick={
                            this.checktrue(this.state.seat[80])
                              ? (e) => this.onClickData(this.state.seat[80])
                              : null
                          }
                        >
                          {this.state.seat[80]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[81]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[81]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[81]}
                          onClick={
                            this.checktrue(this.state.seat[81])
                              ? (e) => this.onClickData(this.state.seat[81])
                              : null
                          }
                        >
                          {this.state.seat[81]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[82]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[82]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[82]}
                          onClick={
                            this.checktrue(this.state.seat[82])
                              ? (e) => this.onClickData(this.state.seat[82])
                              : null
                          }
                        >
                          {this.state.seat[82]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[83]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[83]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[83]}
                          onClick={
                            this.checktrue(this.state.seat[83])
                              ? (e) => this.onClickData(this.state.seat[83])
                              : null
                          }
                        >
                          {this.state.seat[83]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[84]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[84]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[84]}
                          onClick={
                            this.checktrue(this.state.seat[84])
                              ? (e) => this.onClickData(this.state.seat[84])
                              : null
                          }
                        >
                          {this.state.seat[84]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[85]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[85]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[85]}
                          onClick={
                            this.checktrue(this.state.seat[85])
                              ? (e) => this.onClickData(this.state.seat[85])
                              : null
                          }
                        >
                          {this.state.seat[85]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[86]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[86]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[86]}
                          onClick={
                            this.checktrue(this.state.seat[86])
                              ? (e) => this.onClickData(this.state.seat[86])
                              : null
                          }
                        >
                          {this.state.seat[86]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[87]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[87]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[87]}
                          onClick={
                            this.checktrue(this.state.seat[87])
                              ? (e) => this.onClickData(this.state.seat[87])
                              : null
                          }
                        >
                          {this.state.seat[87]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[88]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[88]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[88]}
                          onClick={
                            this.checktrue(this.state.seat[88])
                              ? (e) => this.onClickData(this.state.seat[88])
                              : null
                          }
                        >
                          {this.state.seat[88]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[89]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[89]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[89]}
                          onClick={
                            this.checktrue(this.state.seat[89])
                              ? (e) => this.onClickData(this.state.seat[89])
                              : null
                          }
                        >
                          {this.state.seat[89]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[90]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[90]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[90]}
                          onClick={
                            this.checktrue(this.state.seat[90])
                              ? (e) => this.onClickData(this.state.seat[90])
                              : null
                          }
                        >
                          {this.state.seat[90]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[91]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[91]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[91]}
                          onClick={
                            this.checktrue(this.state.seat[91])
                              ? (e) => this.onClickData(this.state.seat[91])
                              : null
                          }
                        >
                          {this.state.seat[91]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[92]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[92]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[92]}
                          onClick={
                            this.checktrue(this.state.seat[92])
                              ? (e) => this.onClickData(this.state.seat[92])
                              : null
                          }
                        >
                          {this.state.seat[92]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[93]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[93]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[93]}
                          onClick={
                            this.checktrue(this.state.seat[93])
                              ? (e) => this.onClickData(this.state.seat[93])
                              : null
                          }
                        >
                          {this.state.seat[93]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[94]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[94]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[94]}
                          onClick={
                            this.checktrue(this.state.seat[94])
                              ? (e) => this.onClickData(this.state.seat[94])
                              : null
                          }
                        >
                          {this.state.seat[94]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[95]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[95]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[95]}
                          onClick={
                            this.checktrue(this.state.seat[95])
                              ? (e) => this.onClickData(this.state.seat[95])
                              : null
                          }
                        >
                          {this.state.seat[95]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[96]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[96]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[96]}
                          onClick={
                            this.checktrue(this.state.seat[96])
                              ? (e) => this.onClickData(this.state.seat[96])
                              : null
                          }
                        >
                          {this.state.seat[96]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[97]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[97]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[97]}
                          onClick={
                            this.checktrue(this.state.seat[97])
                              ? (e) => this.onClickData(this.state.seat[97])
                              : null
                          }
                        >
                          {this.state.seat[97]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[98]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[98]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[98]}
                          onClick={
                            this.checktrue(this.state.seat[98])
                              ? (e) => this.onClickData(this.state.seat[98])
                              : null
                          }
                        >
                          {this.state.seat[98]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[99]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[99]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[99]}
                          onClick={
                            this.checktrue(this.state.seat[99])
                              ? (e) => this.onClickData(this.state.seat[99])
                              : null
                          }
                        >
                          {this.state.seat[99]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[100]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[100]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[100]}
                          onClick={
                            this.checktrue(this.state.seat[100])
                              ? (e) => this.onClickData(this.state.seat[100])
                              : null
                          }
                        >
                          {this.state.seat[100]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[101]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[101]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[101]}
                          onClick={
                            this.checktrue(this.state.seat[101])
                              ? (e) => this.onClickData(this.state.seat[101])
                              : null
                          }
                        >
                          {this.state.seat[101]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[102]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[102]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[102]}
                          onClick={
                            this.checktrue(this.state.seat[102])
                              ? (e) => this.onClickData(this.state.seat[102])
                              : null
                          }
                        >
                          {this.state.seat[102]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[103]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[103]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[103]}
                          onClick={
                            this.checktrue(this.state.seat[103])
                              ? (e) => this.onClickData(this.state.seat[103])
                              : null
                          }
                        >
                          {this.state.seat[103]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[104]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[104]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[104]}
                          onClick={
                            this.checktrue(this.state.seat[104])
                              ? (e) => this.onClickData(this.state.seat[104])
                              : null
                          }
                        >
                          {this.state.seat[104]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[105]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[105]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[105]}
                          onClick={
                            this.checktrue(this.state.seat[105])
                              ? (e) => this.onClickData(this.state.seat[105])
                              : null
                          }
                        >
                          {this.state.seat[105]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[106]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[106]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[106]}
                          onClick={
                            this.checktrue(this.state.seat[106])
                              ? (e) => this.onClickData(this.state.seat[106])
                              : null
                          }
                        >
                          {this.state.seat[106]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[107]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[107]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[107]}
                          onClick={
                            this.checktrue(this.state.seat[107])
                              ? (e) => this.onClickData(this.state.seat[107])
                              : null
                          }
                        >
                          {this.state.seat[107]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[108]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[108]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[108]}
                          onClick={
                            this.checktrue(this.state.seat[108])
                              ? (e) => this.onClickData(this.state.seat[108])
                              : null
                          }
                        >
                          {this.state.seat[108]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[109]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[109]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[109]}
                          onClick={
                            this.checktrue(this.state.seat[109])
                              ? (e) => this.onClickData(this.state.seat[109])
                              : null
                          }
                        >
                          {this.state.seat[109]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[110]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[110]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[110]}
                          onClick={
                            this.checktrue(this.state.seat[110])
                              ? (e) => this.onClickData(this.state.seat[110])
                              : null
                          }
                        >
                          {this.state.seat[110]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[111]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[111]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[111]}
                          onClick={
                            this.checktrue(this.state.seat[111])
                              ? (e) => this.onClickData(this.state.seat[111])
                              : null
                          }
                        >
                          {this.state.seat[111]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[112]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[112]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[112]}
                          onClick={
                            this.checktrue(this.state.seat[112])
                              ? (e) => this.onClickData(this.state.seat[112])
                              : null
                          }
                        >
                          {this.state.seat[112]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[113]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[113]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[113]}
                          onClick={
                            this.checktrue(this.state.seat[113])
                              ? (e) => this.onClickData(this.state.seat[113])
                              : null
                          }
                        >
                          {this.state.seat[113]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[114]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[114]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[114]}
                          onClick={
                            this.checktrue(this.state.seat[114])
                              ? (e) => this.onClickData(this.state.seat[114])
                              : null
                          }
                        >
                          {this.state.seat[114]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[115]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[115]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[115]}
                          onClick={
                            this.checktrue(this.state.seat[115])
                              ? (e) => this.onClickData(this.state.seat[115])
                              : null
                          }
                        >
                          {this.state.seat[115]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[116]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[116]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[116]}
                          onClick={
                            this.checktrue(this.state.seat[116])
                              ? (e) => this.onClickData(this.state.seat[116])
                              : null
                          }
                        >
                          {this.state.seat[116]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[117]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[117]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[117]}
                          onClick={
                            this.checktrue(this.state.seat[117])
                              ? (e) => this.onClickData(this.state.seat[117])
                              : null
                          }
                        >
                          {this.state.seat[117]}
                        </div>
                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[118]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[118]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[118]}
                          onClick={
                            this.checktrue(this.state.seat[118])
                              ? (e) => this.onClickData(this.state.seat[118])
                              : null
                          }
                        >
                          {this.state.seat[118]}
                        </div>

                        <div
                          className={
                            this.state.seatChoosed.indexOf(
                              this.state.seat[119]
                            ) > -1
                              ? "singleChooosed md:w-11 w-8 h-9 flex justify-content-center"
                              : this.state.seatReserved.indexOf(
                                  this.state.seat[119]
                                ) > -1
                              ? "singleChooose md:w-11 w-8 h-9 flex justify-content-center"
                              : "single md:w-11 w-8 h-9 flex justify-content-center"
                          }
                          key={this.state.seat[119]}
                          onClick={
                            this.checktrue(this.state.seat[119])
                              ? (e) => this.onClickData(this.state.seat[119])
                              : null
                          }
                        >
                          {this.state.seat[119]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="cinema-note">
                    <li className="single ">Ghế thường</li>
                    <li className="choosing">Ghế đang chọn</li>
                    <li className="busy">Ghế đã chọn</li>
                    <li className="road">Lối đi</li>
                  </ul>
                </div>
              </div>

              <div className="cinema-btn">
                <input
                  type="button"
                  id="cinema-back"
                  value="Quay lại"
                  onClick={() =>
                    this.handleBack(
                      queryString.parse(this.state.menu).id_movie,
                      queryString.parse(this.state.menu).id_dayshowtime,
                      queryString.parse(this.state.menu).id_time
                    )
                  }
                />
                <input
                  type="button"
                  id="cons-chose"
                  className="cons-chose"
                  value="Chọn Đồ Ăn"
                  onClick={() =>
                    this.handleFood(
                      queryString.parse(this.state.menu).id_movie,
                      queryString.parse(this.state.menu).id_dayshowtime,
                      queryString.parse(this.state.menu).id_time,
                      queryString.parse(this.state.menu).quantity_ticket,
                      queryString.parse(this.state.menu).summary,
                      this.state.seatReserved
                    )
                  }
                />
                {queryString.parse(this.state.menu).sum_food > 0 ||
                this.state.seatReserved[0] != null ? (
                  <input
                    type="button"
                    id="cinema-next"
                    value="Thanh toán"
                    onClick={() =>
                      this.handleSubmited(
                        queryString.parse(this.state.menu).id_movie,
                        queryString.parse(this.state.menu).id_dayshowtime,
                        queryString.parse(this.state.menu).id_time,
                        queryString.parse(this.state.menu).quantity_ticket,
                        queryString.parse(this.state.menu).summary,
                        this.state.seatReserved,
                        queryString.parse(this.state.menu).id_food,
                        queryString.parse(this.state.menu).food
                      )
                    }
                  />
                ) : (
                  <input
                    style={{
                      borderRadius: "30px 0px 30px 30px",
                      opacity: "0.5",
                      pointerEvents: "none",
                    }}
                    type="button"
                    id="cinema-next"
                    value="Thanh toán"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header user={this.state.id_user} />
        <div>{componet}</div>
        <Footer />
      </div>
    );
  }
}

export default ChooseChair;
