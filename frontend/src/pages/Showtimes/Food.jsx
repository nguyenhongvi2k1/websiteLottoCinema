import { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import queryString from "query-string";

class Combo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      menu: this.props.location.search,
      combo: [],
      combo_1: 0,
      combo_2: 0,
      combo_3: 0,
      combo_4: 0,
      combo_5: 0,
      combo_6: 0,
      sum_1: 0,
      sum_2: 0,
      sum_3: 0,
      sum_4: 0,
      sum_5: 0,
      sum_6: 0,
    };
    this.handleAddCombo_1 = this.handleAddCombo_1.bind(this);
    this.handleSubCombo_1 = this.handleSubCombo_1.bind(this);
    this.handleAddCombo_2 = this.handleAddCombo_2.bind(this);
    this.handleSubCombo_2 = this.handleSubCombo_2.bind(this);
    this.handleAddCombo_3 = this.handleAddCombo_3.bind(this);
    this.handleSubCombo_3 = this.handleSubCombo_3.bind(this);
    this.handleAddCombo_4 = this.handleAddCombo_4.bind(this);
    this.handleSubCombo_4 = this.handleSubCombo_4.bind(this);
    this.handleAddCombo_5 = this.handleAddCombo_5.bind(this);
    this.handleSubCombo_5 = this.handleSubCombo_5.bind(this);
    this.handleAddCombo_6 = this.handleAddCombo_6.bind(this);
    this.handleSubCombo_6 = this.handleSubCombo_6.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCancel(id_movie, id_dayshowtime, id_time, quantity_ticket, summary, chair) {
    window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}`;
  }

  onSubmit(id_movie, id_dayshowtime, id_time, quantity_ticket, summary, chair) {
    if (this.state.combo_1 !== 0) {
      window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${this.state.combo[0].id}&food=${this.state.combo_1}`;
    } else if (this.state.combo_2 !== 0) {
      window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${this.state.combo[1].id}&food=${this.state.combo_2}`;
    } else if (this.state.combo_3 !== 0) {
      window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${this.state.combo[2].id}&food=${this.state.combo_3}`;
    } else if (this.state.combo_4 !== 0) {
      window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${this.state.combo[3].id}&food=${this.state.combo_4}`;
    } else if (this.state.combo_5 !== 0) {
      window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${this.state.combo[4].id}&food=${this.state.combo_5}`;
    } else {
      window.location.href = `/choose-chair?id_movie=${id_movie}&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}&quantity_ticket=${quantity_ticket}&summary=${summary}&chair=${chair}&id_food=${this.state.combo[5].id}&food=${this.state.combo_6}`;
    }
  }

  handleAddCombo_1() {
    this.setState({ combo_1: this.state.combo_1 + 1 });
    this.setState({ sum_1: this.state.sum_1 + this.state.combo[0].price});
  }
  handleSubCombo_1() {
    this.setState({
      combo_1: this.state.combo_1 > 0 ? this.state.combo_1 - 1 : 0,
    });
    this.setState({
      sum_1: this.state.sum_1 > 0 ? this.state.sum_1 - this.state.combo[0].price : 0,
    });
  }
  handleAddCombo_2() {
    this.setState({ combo_2: this.state.combo_2 + 1 });
    this.setState({ sum_2: this.state.sum_2 + this.state.combo[1].price });
  }
  handleSubCombo_2() {
    this.setState({
      combo_2: this.state.combo_2 > 0 ? this.state.combo_2 - 1 : 0,
    });
    this.setState({
      sum_2: this.state.sum_2 > 0 ? this.state.sum_2 - this.state.combo[1].price : 0,
    });
  }
  handleAddCombo_3() {
    this.setState({ combo_3: this.state.combo_3 + 1 });
    this.setState({ sum_3: this.state.sum_3 + this.state.combo[2].price });
  }
  handleSubCombo_3() {
    this.setState({
      combo_3: this.state.combo_3 > 0 ? this.state.combo_3 - 1 : 0,
    });
    this.setState({
      sum_3: this.state.sum_3 > 0 ? this.state.sum_3 - this.state.combo[2].price : 0,
    });
  }
  handleAddCombo_4() {
    this.setState({ combo_4: this.state.combo_4 + 1 });
    this.setState({ sum_4: this.state.sum_4 + this.state.combo[3].price });
  }
  handleSubCombo_4() {
    this.setState({
      combo_4: this.state.combo_4 > 0 ? this.state.combo_4 - 1 : 0,
    });
    this.setState({
      sum_4: this.state.sum_4 > 0 ? this.state.sum_4 - this.state.combo[3].price : 0,
    });
  }
  handleAddCombo_5() {
    this.setState({ combo_5: this.state.combo_5 + 1 });
    this.setState({ sum_5: this.state.sum_5 + this.state.combo[4].price });
  }
  handleSubCombo_5() {
    this.setState({
      combo_5: this.state.combo_5 > 0 ? this.state.combo_5 - 1 : 0,
    });
    this.setState({
      sum_5: this.state.sum_5 > 0 ? this.state.sum_5 - this.state.combo[4].price : 0,
    });
  }
  handleAddCombo_6() {
    this.setState({ combo_6: this.state.combo_6 + 1 });
    this.setState({ sum_6: this.state.sum_6 + this.state.combo[5].price });
  }
  handleSubCombo_6() {
    this.setState({
      combo_6: this.state.combo_6 > 0 ? this.state.combo_6 - 1 : 0,
    });
    this.setState({
      sum_6: this.state.sum_6 > 0 ? this.state.sum_6 - this.state.combo[5].price : 0,
    });
  }
  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) }, () => {
        // console.log((this.state.user.response))
      });
    }
    const id_movie = queryString.parse(this.state.menu).id_movie;
    const id_dayshowtime = queryString.parse(this.state.menu).id_dayshowtime;
    const id_time = queryString.parse(this.state.menu).id_time;
    console.log(id_movie, id_dayshowtime, id_time);
    fetch(
      `http://localhost:8000/api/orderchair/?id_movie=${id_movie}&&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ showtime: data }, () => {
          // console.log(this.state.showtime);
        })
      );
    fetch(`http://localhost:8000/api/foods/`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({ combo: data }, () => {
          console.log("combo: ", this.state.combo);
        })
      );
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
              <div className="flex justify-content-center">
                <div className="md:w-3/4 w-full">
                  <div className="cons-content ">
                    <div className="cons-box rounded-lg">
                      <ul className="cons-box-list rounded-lg">
                        <li data-group="217">
                          <h2 className="md:text-xl text-lg">COMBO</h2>
                          <div className="combo-item">
                            <div className="combo-text">
                              <h3 className="md:text-lg text-base">
                                {this.state.combo[0]?.name}
                              </h3>
                              <p className="text-xs italic">1 Bắp Ngọt 60oz + 1 Coke 22oz - V</p>
                              <div className="combo-price  md:text-base text-sm">
                                giá:
                                <span className="text-price md:text-base text-sm">
                                  {this.state.combo[0]?.price}
                                </span>
                                <sup>đ</sup>
                              </div>
                            </div>

                            <div className="combo-input">
                              <p
                                type="button"
                                onClick={this.handleSubCombo_1}
                                className="cmb-minus"
                              >
                                -
                              </p>
                              <input
                                data-id="1101596"
                                data-price="105000"
                                data-name="Combo Couple"
                                type="text"
                                value={this.state.combo_1}
                                size="3"
                              />
                              <p
                                type="button"
                                onClick={this.handleAddCombo_1}
                                className="cmb-add"
                              >
                                +
                              </p>
                            </div>
                            <div className="combo-total">
                              <div className="combo-total-outer md:text-lg text-base ">
                                <span>{this.state.sum_1}</span>
                                <sup>đ</sup>
                              </div>
                            </div>
                          </div>
                          <div className="combo-item">
                            <div className="combo-text">
                              <h3 className="md:text-lg text-base">
                                {this.state.combo[1]?.name}
                              </h3>
                             <p className="text-xs italic">2 Coke 32oz + 1 Bắp Ngọt 60oz</p>
                              <div className="combo-price  md:text-base text-sm">
                                giá:
                                <span className="text-price md:text-base text-sm">
                                  {this.state.combo[1]?.price}
                                </span>
                                <sup>đ</sup>
                              </div>
                            </div>
                            <div className="combo-input">
                              <p
                                type="button"
                                onClick={this.handleSubCombo_2}
                                className="cmb-minus"
                              >
                                -
                              </p>
                              <input
                                data-id="1101596"
                                data-price="105000"
                                data-name="Combo Couple"
                                type="text"
                                value={this.state.combo_2}
                                size="3"
                              />
                              <p
                                type="button"
                                onClick={this.handleAddCombo_2}
                                className="cmb-add"
                              >
                                +
                              </p>
                            </div>
                            <div className="combo-total">
                              <div className="combo-total-outer md:text-lg text-base">
                                <span>{this.state.sum_2}</span>
                                <sup>đ</sup>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li data-group="80">
                          <h2 className="md:text-xl text-lg">BẮP RANG</h2>
                          <div className="combo-item">
                            <div className="combo-text">
                              <h3 className="md:text-lg text-base">
                                {this.state.combo[2]?.name}
                              </h3>
                              <div className="combo-price  md:text-base text-sm">
                                giá:
                                <span className="text-price md:text-base text-sm">
                                  {this.state.combo[2]?.price}
                                </span>
                                <sup>đ</sup>
                              </div>
                            </div>
                            <div className="combo-input">
                              <p
                                type="button"
                                onClick={this.handleSubCombo_3}
                                className="cmb-minus"
                              >
                                -
                              </p>
                              <input
                                data-id="1101597"
                                data-price="199000"
                                data-name="Combo Party"
                                type="text"
                                value={this.state.combo_3}
                                size="3"
                              />
                              <p
                                type="button"
                                onClick={this.handleAddCombo_3}
                                className="cmb-add"
                              >
                                +
                              </p>
                            </div>
                            <div className="combo-total">
                              <div className="combo-total-outer md:text-lg text-base">
                                <span>{this.state.sum_3}</span>
                                <sup>đ</sup>
                              </div>
                            </div>
                          </div>
                          <div className="combo-item">
                            <div className="combo-text">
                              <h3 className="md:text-lg text-base">
                                {this.state.combo[3]?.name}
                              </h3>
                              <div className="combo-price  md:text-base text-sm">
                                giá:
                                <span className="text-price md:text-base text-sm">
                                  {this.state.combo[3]?.price}
                                </span>
                                <sup>đ</sup>
                              </div>
                            </div>
                            <div className="combo-input">
                              <p
                                type="button"
                                onClick={this.handleSubCombo_4}
                                className="cmb-minus"
                              >
                                -
                              </p>
                              <input
                                data-id="265"
                                data-price="16000"
                                data-name="Nước Suối Dasani 500ml"
                                type="text"
                                value={this.state.combo_4}
                                size="3"
                              />
                              <p
                                type="button"
                                onClick={this.handleAddCombo_4}
                                className="cmb-add"
                              >
                                +
                              </p>
                            </div>
                            <div className="combo-total">
                              <div className="combo-total-outer md:text-lg text-base">
                                <span>{this.state.sum_4}</span>
                                <sup>đ</sup>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li data-group="75">
                          <h2 className="md:text-xl text-lg">NƯỚC ĐÓNG CHAI</h2>
                          <div className="combo-item">
                            <div className="combo-text">
                              <h3 className="md:text-lg text-base">
                                {this.state.combo[4]?.name}
                              </h3>
                              <div className="combo-price  md:text-base text-sm">
                                giá:
                                <span className="text-price md:text-base text-sm">
                                  {this.state.combo[4]?.price}
                                </span>
                                <sup>đ</sup>
                              </div>
                            </div>
                            <div className="combo-input">
                              <p
                                type="button"
                                onClick={this.handleSubCombo_5}
                                className="cmb-minus"
                              >
                                -
                              </p>
                              <input
                                data-id="265"
                                data-price="16000"
                                data-name="Nước Suối Dasani 500ml"
                                type="text"
                                value={this.state.combo_5}
                                size="3"
                              />
                              <p
                                type="button"
                                onClick={this.handleAddCombo_5}
                                className="cmb-add"
                              >
                                +
                              </p>
                            </div>
                            <div className="combo-total">
                              <div className="combo-total-outer md:text-lg text-base">
                                <span>{this.state.sum_5}</span>
                                <sup>đ</sup>
                              </div>
                            </div>
                          </div>

                          <div className="combo-item">
                            <div className="combo-text">
                              <h3 className="md:text-lg text-base">
                                {this.state.combo[5]?.name}
                              </h3>
                              <div className="combo-price  md:text-base text-sm">
                                giá:
                                <span className="text-price md:text-base text-sm">
                                  {this.state.combo[5]?.price}
                                </span>
                                <sup>đ</sup>
                              </div>
                            </div>
                            <div className="combo-input">
                              <p
                                type="button"
                                onClick={this.handleSubCombo_6}
                                className="cmb-minus"
                              >
                                -
                              </p>
                              <input
                                data-id="265"
                                data-price="16000"
                                data-name="Nước Suối Dasani 500ml"
                                type="text"
                                value={this.state.combo_6}
                                size="3"
                              />
                              <p
                                type="button"
                                onClick={this.handleAddCombo_6}
                                className="cmb-add"
                              >
                                +
                              </p>
                            </div>
                            <div className="combo-total">
                              <div className="combo-total-outer md:text-lg text-base">
                                <span>{this.state.sum_6}</span>
                                <sup>đ</sup>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="cons-input">
                      <input
                        type="button"
                        className="cons-cancel"
                        id="cons-cancel"
                        onClick={() =>
                          this.onCancel(
                            queryString.parse(this.state.menu).id_movie,
                            queryString.parse(this.state.menu).id_dayshowtime,
                            queryString.parse(this.state.menu).id_time,
                            queryString.parse(this.state.menu).quantity_ticket,
                            queryString.parse(this.state.menu).summary,
                            queryString.parse(this.state.menu).chair
                          )
                        }
                        value="Hủy"
                      />
                      <input
                        type="button"
                        className="cons-ok"
                        id="cons-ok"
                        onClick={() =>
                          this.onSubmit(
                            queryString.parse(this.state.menu).id_movie,
                            queryString.parse(this.state.menu).id_dayshowtime,
                            queryString.parse(this.state.menu).id_time,
                            queryString.parse(this.state.menu).quantity_ticket,
                            queryString.parse(this.state.menu).summary,
                            queryString.parse(this.state.menu).chair
                          )
                        }
                        value="Đồng ý"
                      />
                    </div>
                  </div>
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
export default Combo;
