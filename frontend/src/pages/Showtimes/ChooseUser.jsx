import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import queryString from "query-string";

class ChooseUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      id_movie: this.props.match.params.id_movie,
      id_showtime: this.props.location.search,
      showtime: [],
      counter_old: 0,
      counter_children: 0,
      sum_old: 0,
      sum_children: 0,
    };
    this.handleAdditionOld = this.handleAdditionOld.bind(this);
    this.handleSubtractionOld = this.handleSubtractionOld.bind(this);
    this.handleAdditionChildren = this.handleAdditionChildren.bind(this);
    this.handleSubtractionChildren = this.handleSubtractionChildren.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) }, () => {
        console.log(this.state.user.response);
      });
    }
    const id_movie = this.state.id_movie;
    const id_dayshowtime = queryString.parse(
      this.state.id_showtime
    ).id_dayshowtime;
    const id_time = queryString.parse(this.state.id_showtime).id_time;
    fetch(
      `http://localhost:8000/api/orderchair/?id_movie=${id_movie}&&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ showtime: data }, () => {
          console.log(this.state.showtime);
        })
      );
  }
  handleAdditionOld() {
    this.setState({ counter_old: this.state.counter_old + 1 });
    this.setState({ sum_old: this.state.sum_old + 65000 });
  }
  handleSubtractionOld() {
    this.setState({
      counter_old: this.state.counter_old > 0 ? this.state.counter_old - 1 : 0,
    });
    this.setState({
      sum_old: this.state.sum_old > 0 ? this.state.sum_old - 65000 : 0,
    });
  }
  handleAdditionChildren() {
    this.setState({ counter_children: this.state.counter_children + 1 });
    this.setState({ sum_children: this.state.sum_children + 45000 });
  }
  handleSubtractionChildren() {
    this.setState({
      counter_children:
        this.state.counter_children > 0 ? this.state.counter_children - 1 : 0,
    });
    this.setState({
      sum_children:
        this.state.sum_children > 0 ? this.state.sum_children - 45000 : 0,
    });
  }
  handleBack(id_movie) {
    window.location.href = `/movie/${id_movie}`;
  }
  onChangeQuantity(event) {
    this.setState({ quantity: event.target.quantity });
  }
  onChangeSum(event) {
    this.setState({ sum: event.target.sum });
  }
  handleSubmit(id_movie, id_dayshowtime, id_time, quantity_ticket, summary) {
    const body_data = { quantity_ticket, summary };
    console.log("body_data : ", body_data);
    window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}`;
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
                <div className="flex">
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
                          {this.state.counter_old + this.state.counter_children}
                        </span>
                        <span> vé</span>
                      </td>
                      <td className="border border-slate-300 text-center text-center font-serif text-gray-200 bg-gray-900">
                        <span>
                          {this.state.sum_old + this.state.sum_children}
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

            <div className="flex justify-content-center">
              <div className="ticket-wrap lg:w-75 md:w-9/12 sm:w-full">
                <div className="tbl-wrap">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="lg:text-lg md:text-base text-ms">
                          Loại vé
                        </th>
                        <th className="lg:text-lg md:text-base text-ms">
                          Số lượng
                        </th>
                        <th className="lg:text-lg md:text-base text-ms">
                          Giá (VNĐ)
                        </th>
                        <th className="lg:text-lg md:text-base text-ms">
                          Tổng tiền (VNĐ)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Người Lớn</td>
                        <td className="ticket-num flex align-items-center justify-around">
                          <button
                            onClick={this.handleSubtractionOld}
                            className="minus"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={this.state.counter_old}
                            id="old"
                            readonly=""
                            size="3"
                          />
                          <button
                            onClick={this.handleAdditionOld}
                            className="add"
                          >
                            +
                          </button>
                        </td>
                        <td className="ticket-price" data-price="65000">
                          65000<sup>đ</sup>
                        </td>
                        <td className="ticket-total" data-total="0">
                          <span>{this.state.sum_old}</span>
                          <sup>đ</sup>
                        </td>
                      </tr>
                      <tr data-seatstyle-id="29" data-ticket-id="26">
                        <td>Trẻ em</td>
                        <td className="ticket-num flex align-items-center justify-around">
                          <button
                            onClick={this.handleSubtractionChildren}
                            className="minus"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={this.state.counter_children}
                            id="children"
                            readonly=""
                            size="3"
                          />
                          <button
                            onClick={this.handleAdditionChildren}
                            className="add"
                          >
                            +
                          </button>
                        </td>
                        <td className="ticket-price" data-price="65000">
                          45000<sup>đ</sup>
                        </td>
                        <td className="ticket-total" data-total="0">
                          <span>{this.state.sum_children}</span>
                          <sup>đ</sup>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="ticket-cal text-center p-4 ">
                  <li className="total-ticket-num mr-5">
                    Số lượng:
                    <span>
                      {this.state.counter_old + this.state.counter_children}
                    </span>
                    <mark>vé</mark>
                  </li>
                  <li className="total-ticket-amount ml-5">
                    Tổng số tiền:
                    <span>{this.state.sum_old + this.state.sum_children}</span>
                    <sup>đ</sup>
                  </li>
                </ul>

                <div className="cinema-btn" style={{ textAlign: "center" }}>
                  <input
                    style={{ borderRadius: "30px 30px 30px 0" }}
                    type="button"
                    value="Quay lại"
                    id="ticket-back"
                    onClick={() => this.handleBack(showtime?.fk_movie.id)}
                  />
                  {this.state.counter_old + this.state.counter_children > 0 ? (
                    <input
                      style={{ borderRadius: "30px 0px 30px 30px" }}
                      type="button"
                      value="Chọn ghế"
                      id="ticket-next"
                      onClick={() =>
                        this.handleSubmit(
                          showtime?.fk_movie.id,
                          showtime?.fk_dayshowtimes.id,
                          showtime?.fk_dayshowtimes.fk_showtime.id,
                          this.state.counter_old + this.state.counter_children,
                          this.state.sum_old + this.state.sum_children
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
                      value="Chọn ghế"
                      id="ticket-next-ticket"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header user={this.state.user} />
        <div>{componet}</div>
        <Footer />
      </div>
    );
  }
}
export default ChooseUser;
