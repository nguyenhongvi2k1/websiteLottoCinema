import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import queryString from "query-string";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLIENT_ID } from "../../components/Checkout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: this.props.location.search,
      user: null,
      id_user: null,
      id_food: null,
      sum: 0,
      sum_food: 0,
      showtime: [],
      food: [],
      showpayment: false,
      success: false,
      ErrorMessage: "",
      orderID: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeShowPayment = this.changeShowPayment.bind(this);
  }
  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ id_user: JSON.parse(jsonStr) }, () => {
        fetch(
          `http://localhost:8000/api/getuser/?email=${this.state.id_user?.response?.email}`
        )
          .then((res) => res.json())
          .then((data) =>
            this.setState({ user: data }, () => {
              // console.log(this.state.user);
            })
          );
      });
    }

    const id_movie = queryString.parse(this.state.menu).id_movie;
    const id_dayshowtime = queryString.parse(this.state.menu).id_dayshowtime;
    const id_time = queryString.parse(this.state.menu).id_time;
    const id_food = queryString.parse(this.state.menu).id_food;
    const food = queryString.parse(this.state.menu).food;

    fetch(
      `http://localhost:8000/api/orderchair/?id_movie=${id_movie}&&id_dayshowtime=${id_dayshowtime}&id_time=${id_time}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ showtime: data }, () => {
          // console.log(this.state.showtime);
        })
      );
      console.log(id_food)
      if(id_food === "undefined"){
      this.setState({
        sum:
          parseInt(queryString.parse(this.state.menu).summary),
          sum_food:0,
          id_food: null
      });
    } else {
      fetch(`http://localhost:8000/api/getfood/${id_food}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ food: data }, () => {
          console.log("food",this.state.food);
          this.setState({
            sum:
              parseInt(queryString.parse(this.state.menu).summary) +
              parseInt(this.state.food.price) * parseInt(food),
            sum_food: parseInt(this.state.food.price) * parseInt(food),
            id_food: id_food
          });
        });
      });
    }

  }
  changeShowPayment() {
    this.setState({ showpayment: true });
  }

  onSubmit() {
    this.setState({ showpayment: !this.state.showpayment });
  }
  render() {
    const moneyFood = Math.floor(
     (this.state.sum_food) /
        23000
    );
    const moneyChair = Math.floor(
      parseInt(queryString.parse(this.state.menu).summary) / 23000
    );

    // console.log(moneyChair, moneyFood);

    const componet = this.state.showtime?.map((showtime) => {
      const createOrder = (data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                description:
                  showtime?.fk_movie.title +
                  " \r\n " +
                  "Day Showtime: " +
                  showtime?.fk_dayshowtimes.day_showtime +
                  " \r\n" +
                  showtime?.fk_dayshowtimes.fk_showtime.time +
                  " \r\n " +
                  "Chair: " +
                  queryString.parse(this.state.menu)?.chair,
                amount: {
                  currency_code: "USD",
                  value: parseFloat(moneyChair, 10) + parseFloat(moneyFood, 10),
                },
              },
            ],
          })
          .then((orderID) => {
            this.setState({ orderID: this.state.orderID });
            // console.log(this.state.orderID);
            return orderID;
          });
      };
      const id_user = queryString.parse(this.state.menu).id_user;
      const id_movie = queryString.parse(this.state.menu).id_movie;
      // const id_food = queryString.parse(this.state.menu).id_food;
      const id_food = this.state.id_food
      const id_dayshowtime = queryString.parse(this.state.menu).id_dayshowtime;
      const id_time = queryString.parse(this.state.menu).id_time;
      const quantity_ticket = queryString.parse(
        this.state.menu
      ).quantity_ticket;
      const summary = this.state.sum;
      // const id_food = null
      const chair = queryString.parse(this.state.menu).chair;
      // if(id_foods === "undefined"){
      //   id_food = null
      //   } else{
      //     id_food = id_foods
      //   }
        const body_data = {
          id_user,
          id_movie,
          id_food,
          id_dayshowtime,
          id_time,
          quantity_ticket,
          summary,
          chair,
        };
      console.log("body_data : ", body_data);
      // check Approval
      const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
          const { payer } = details;
          console.log(payer);
          
          fetch(`http://localhost:8000/api/postpaymentticket/`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(body_data), // body data type must match "Content-Type" header
          }).then((res) => {
            if (res.status === 200) {
              window.location.href = "/";
              toast.success(
                "Bạn đã thanh toán thành công. Chúc bạn xem phim vui vẻ <3"
              );
            }
          });
        });
      };

      //capture likely error
      // const onError = (data, actions) => {
      //   this.setState({ ErrorMessage: "An Error occured with your payment " });
      // };

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
                        <span>{this.state.sum}</span>

                        <sup>đ</sup>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 text-center text-center font-sans text-gray-200 bg-gray-900">
                        Số ghế
                      </td>
                      <span className="text-center text-center font-serif text-gray-200 bg-gray-900">
                        {queryString.parse(this.state.menu)?.chair}
                      </span>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="order-content mb-2">
            <div className="final-content ">
              <div className="flex  justify-content-center">
                <div className="flex justify-content-center w-75 cinema-name p-2 my-2 rounded-r-full rounded-l-full">
                  <h2 className="lg:text-3xl md:text-2xl text-xl mb-0">
                    Lotto Cinema
                  </h2>
                </div>
              </div>
              <div className="final-confirm">
                <p>
                  Cảm ơn quý khách đã đến với <strong>Lottocinema</strong> !
                  <br /> Xin quý khách vui lòng kiểm tra lại thông tin đặt vé{" "}
                </p>
                <div className="confirm-box md:text-base text-sm">
                  {this.state.user?.map((user) => (
                    <div className="confirm-cus">
                      <p>
                        Họ tên: <strong>{user?.name}</strong>
                      </p>
                      <p>
                        Email: <strong> {user?.email}</strong>
                      </p>
                      <p>
                        Phone: <strong>{user?.phone}</strong>
                      </p>
                    </div>
                  ))}
                  <div className="confirm-film">
                    <div className="confirm-film-pic">
                      <img
                        src={
                         showtime?.fk_movie?.poster
                        }
                        alt="ảnh phim"
                      />
                    </div>
                    <div className="confirm-film-text">
                      <h3 className=" md:text-xl text-sm">
                        {showtime?.fk_movie?.title}
                      </h3>
                      <p className=" md:text-base text-xs">
                        Ngày chiếu:{" "}
                        <b>{showtime?.fk_dayshowtimes?.day_showtime}</b>
                      </p>
                      <p className=" md:text-base text-xs">
                        Xuất chiếu:{" "}
                        <b>{showtime?.fk_dayshowtimes?.fk_showtime?.time}</b>
                      </p>
                    </div>
                  </div>
                  <div className="confirm-ticket">
                    <div className="confirm-mark md:text-base text-xs">Ghế</div>
                    <div className="confirm-text">
                      <div className="confirm-mark md:text-base text-xs">
                        {queryString.parse(this.state.menu).chair}
                      </div>
                      <div className="confirm-value md:text-base text-xs">
                        <span>
                          {queryString.parse(this.state.menu).summary}
                        </span>
                        <sup>đ</sup>
                      </div>
                    </div>
                  </div>
                  <div class="confirm-cons">
                    <div class="confirm-mark md:text-base text-xs">Combo</div>
                    <div className="confirm-text">
                      <div className="confirm-mark md:text-base text-xs">
                        {this.state.food?.name}
                      </div>
                      <div className="confirm-value">
                        <span className="md:text-base text-xs">
                          {this.state.sum_food}
                        </span>
                        <sup>đ</sup>
                      </div>
                    </div>
                  </div>
                  <div class="confirm-total">
                    <div class="confirm-mark">Tổng tiền</div>
                    <div class="confirm-value">
                      <span>{this.state.sum}</span>
                      <sup>đ</sup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="final-form mb-2">
                <form id="final">
                  <div className="input-text">
                    <h2 className="lg:text-3xl md:text-2xl text-xl mb-0">
                      ĐIỀU KHOẢN CHUNG
                    </h2>
                    <div className="terms_condition_paypal md:text-base text-xs">
                      <p>&nbsp;</p>
                      <p className="md:text-base text-xs">
                        Việc bạn sử dụng website này đồng nghĩa với việc bạn
                        đồng ý với những thỏa thuận dưới đây.
                      </p>
                      <p className="md:text-base text-xs">
                        Nếu bạn không đồng ý, xin vui lòng không sử dụng
                        website.
                      </p>
                      <br />
                      <div>
                        <strong>1. Trách nhiệm của người sử dụng</strong>
                        <p>
                          Khi truy cập vào trang web này, bạn đồng ý chấp nhận
                          mọi rủi ro. Lottocinema và các bên đối tác khác không
                          chịu trách nhiệm về bất kỳ tổn thất nào do những hậu
                          quả trực tiếp, tình cờ hay gián tiếp; những thất
                          thoát, chi phí (bao gồm chi phí pháp lý, chi phí tư
                          vấn hoặc các khoản chi tiêu khác) có thể phát sinh
                          trực tiếp hoặc gián tiếp do việc truy cập trang web
                          hoặc khi tải dữ liệu về máy; những tổn hại gặp phải do
                          virus, hành động phá hoại trực tiếp hay gián tiếp của
                          hệ thống máy tính khác, đường dây điện thoại, phần
                          cứng, phần mềm, lỗi chương trình, hoặc bất kì các lỗi
                          nào khác; đường truyền dẫn của máy tính hoặc nối kết
                          mạng bị chậm…
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>2. Về nội dung trên trang web:</strong>
                        <p>
                          Tất cả những thông tin ở đây được cung cấp cho bạn một
                          cách trung thực như bản thân sự
                          việc.&nbsp;Cinestar&nbsp;và các bên liên quan không
                          bảo đảm, hay có bất kỳ tuyên bố nào liên quan đến tính
                          chính xác, tin cậy của việc sử dụng hay kết quả của
                          việc sử dụng nội dung trên trang web này. Nột dung
                          trên website được cung cấp vì lợi ích của cộng đồng và
                          có tính phi thương mại. Các cá nhân và tổ chức không
                          được phếp sử dụng nội dung trên website này với mục
                          đích thương mại mà không có sự ưng thuận
                          của&nbsp;Cinestar&nbsp;bằng văn bản. Mặc
                          dù&nbsp;Cinestar&nbsp;luôn cố gắng cập nhật thường
                          xuyên các nội dung tại trang web, nhưng chúng tôi
                          không bảo đảm rằng các thông tin đó là mới nhất, chính
                          xác hay đầy đủ. Tất cả các nội dung website có thể
                          được thay đổi bất kỳ lúc nào.
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>3. Về bản quyền:</strong>
                        <p>
                          Cinestar&nbsp;là chủ bản quyền của trang web này. Việc
                          chỉnh sửa trang, nội dung, và sắp xếp thuộc về thẩm
                          quyền của&nbsp;Cinestar. Sự chỉnh sửa, thay đổi, phân
                          phối hoặc tái sử dụng những nội dung trong trang này
                          vì bất kì mục đích nào khác được xem như vi phạm quyền
                          lợi hợp pháp của&nbsp;Cinestar.
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>4. Về việc sử dụng thông tin:</strong>
                        <p>
                          Chúng tôi sẽ không sử dụng thông tin cá nhân của bạn
                          trên website này nếu không được phép. Nếu bạn đồng ý
                          cung cấp thông tin cá nhân, bạn sẽ được bảo vệ. Thông
                          tin của bạn sẽ được sử dụng với mục đích, liên lạc với
                          bạn để thông báo các thông tin cập nhật
                          của&nbsp;Cinestar&nbsp;như lịch chiếu phim, khuyến mại
                          qua email hoặc bưu điện. Thông tin cá nhân của bạn sẽ
                          không được gửi cho bất kỳ ai sử dụng ngoài trang
                          web&nbsp;Cinestar, ngoại trừ những mở rộng cần thiết
                          để bạn có thể tham gia vào trang web (những nhà cung
                          cấp dịch vụ, đối tác, các công ty quảng cáo) và yêu
                          cầu cung cấp bởi luật pháp. Nếu chúng tôi chia sẻ
                          thông tin cá nhân của bạn cho các nhà cung cấp dịch
                          vụ, công ty quảng cáo, các công ty đối tác liên quan,
                          thì chúng tôi cũng yêu cầu họ bảo vệ thông tin cá nhân
                          của bạn như cách chúng tôi thực hiện.
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>5. Vể việc tải dữ liệu:</strong>
                        <p>
                          Nếu bạn tải về máy những phần mềm từ trang này, thì
                          phần mềm và các dữ liệu tải sẽ thuộc bản quyền
                          của&nbsp;Cinestar&nbsp;và cho phép bạn sử dụng. Bạn
                          không được sở hữu những phầm mềm đã tải
                          và&nbsp;Cinestar&nbsp;không nhượng quyền cho bạn. Bạn
                          cũng không được phép bán, phân phối lại, hay bẻ khóa
                          phần mềm…
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>6. Thay đổi nội dung:</strong>
                        <p>
                          Cinestar&nbsp;giữ quyền thay đổi, chỉnh sửa và loại bỏ
                          những thông tin hợp pháp vào bất kỳ thời điểm nào vì
                          bất kỳ lý do nào.
                        </p>
                      </div>
                      <div>
                        <strong>7. Liên kết với các trang khác:</strong>
                        <p>
                          Mặc dù trang web này có thể được liên kết với những
                          trang khác,&nbsp;Cinestar&nbsp;không trực tiếp hoặc
                          gián tiếp tán thành, tổ chức, tài trợ, đứng sau hoặc
                          sát nhập với những trang đó, trừ phi điều này được nêu
                          ra rõ ràng. Khi truy cập vào trang web bạn phải hiểu
                          và chấp nhận rằng&nbsp;Cinestar&nbsp;không thể kiểm
                          soát tất cả những trang liên kết với
                          trang&nbsp;Cinestar&nbsp;và cũng không chịu trách
                          nhiệm cho nội dung của những trang liên kết.
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>8. Đưa thông tin lên trang web:</strong>
                        <p>
                          Bạn không được đưa lên, hoặc chuyển tải lên trang web
                          tất cả những hình ảnh, từ ngữ khiêu dâm, thô tục, xúc
                          phạm, phỉ báng, bôi nhọ, đe dọa, những thông tin không
                          hợp pháp hoặc những thông tin có thể đưa đến việc vi
                          phạm pháp luật, trách nhiệm pháp
                          lý.&nbsp;Cinestar&nbsp;và tất cả các bên có liên quan
                          đến việc xây dựng và quản lý trang web không chịu
                          trách nhiệm hoặc có nghĩa vụ pháp lý đối với những
                          phát sinh từ nội dung do bạn tải lên trang web.
                        </p>
                      </div>
                      <br />
                      <div>
                        <strong>9. Luật áp dụng:</strong>
                        <p>
                          Mọi hoạt động phát sinh từ trang web có thể sẽ được
                          phân tích và đánh giá theo luật pháp Việt Nam và toà
                          án Tp. Hồ Chí Minh. Và bạn phải đồng ý tuân theo các
                          điều khoản riêng của các toà án này.
                        </p>
                      </div>
                    </div>

                    <label className="payment_check md:text-base text-xs">
                      Tôi bảo đảm mua vé xem phim này theo đúng độ tuổi quy
                      định.
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>

                    <div className="payment_method">
                      <PayPalScriptProvider
                        options={{ "client-id": CLIENT_ID }}
                      >
                        <div>
                          <div className="wrapper">
                            <div className="product-info">
                              <div className="product-price-btn">
                                <div className="cinema-btn">
                                  <button type="button" id="cinema-back">
                                    Quay lại
                                  </button>
                                  <button
                                    type="button"
                                    id="cinema-next"
                                    onClick={this.onSubmit}
                                  >
                                    Thanh toán
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br></br>
                          {this.state.showpayment ? (
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={createOrder}
                              onApprove={onApprove}
                            />
                          ) : null}
                        </div>
                      </PayPalScriptProvider>
                    </div>
                  </div>
                </form>
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
export default Payment;
