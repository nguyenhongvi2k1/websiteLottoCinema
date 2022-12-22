import React from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/shared/Banner";
import Footer from "../../components/Footer/Footer";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Answer1 from "../Help/Answer1";
import Answer2 from "../Help/Answer2";
import Answer3 from "../Help/Answer3";
import Answer4 from "../Help/Answer4";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

class HoTro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: [],
      id_user: null,
      user: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  toggleBox(id) {
    const { open } = this.state;
    let state = open;
    state[id] = !state[id];
    this.setState({ open: state });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(id) {
    // const text_help = this.state.value;
    const id_user = id;
    const text_help = document.getElementById("text_help").value;
    const body_data = { id_user, text_help };
    console.log(body_data);
    fetch("http://localhost:8000/api/postquestion/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_data),
    })
      // .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          alert(
            "You sent completed. We will reply to you as soon as possible."
          );
          window.location.href = "/";
        }
      });
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <Header user={this.state.id_user} />
        <Banner />
        <BuyTicket />

        <div className="container">
          <div className="faq-wrap">
            <div className="section-title">
              <h2>HỎI VÀ ĐÁP</h2>
            </div>
            <div
              id="ask-0"
              className="ask mb-3"
              onClick={() => this.toggleBox(0)}
            >
              <span className="number">01</span>
              <h3>Làm thế nào để mua vé online?</h3>
              <span id="arrow-0" className="st-arrow"></span>
            </div>
            {open[0] && <Answer1 />}
            <div
              id="ask-1"
              className="ask mb-3"
              onClick={() => this.toggleBox(1)}
            >
              <span className="number">02</span>
              <h3>
                Thủ tục đặt vé online và phương thức thanh toán như thế nào?
              </h3>
              <span id="arrow-1" className="st-arrow"></span>
            </div>
            {open[1] && <Answer2 />}
            <div
              id="ask-2"
              className="ask mb-3"
              onClick={() => this.toggleBox(2)}
            >
              <span className="number">03</span>
              <h3>Làm sao để được cấp thẻ thành viên?</h3>
              <span id="arrow-2" className="st-arrow"></span>
            </div>
            {open[2] && <Answer3 />}
            <div
              id="ask-3"
              className="ask mb-3"
              onClick={() => this.toggleBox(3)}
            >
              <span className="number">04</span>
              <h3>Làm sao để biết được số điểm đã tích lũy?</h3>
              <span id="arrow-2" className="st-arrow"></span>
            </div>
            {open[3] && <Answer4 />};
            <div className="faq-form w-75">
              <div className="section-title mt-2">
                <h2>Gửi câu hỏi</h2>
              </div>
              <form id="frm_contact" name="frm_contact">
                {this.state.user?.map((user) => (
                  <div className="require-col">
                    <div className="input-text name">
                      <input
                        name="name"
                        id="name"
                        type="text"
                        placeholder={user.name}
                        disabled
                      />
                    </div>
                    <div className="input-text tel">
                      <input
                        name="phone"
                        id="phone"
                        type="text"
                        placeholder={user.phone}
                        disabled
                      />
                    </div>
                    <div className="input-text email">
                      <input
                        name="email"
                        id="email"
                        type="text"
                        placeholder={user.email}
                        disabled
                      />
                    </div>
                    <div className="input-area">
                      <textarea
                        data-holder="NỘI DUNG"
                        id="text_help"
                        name="text_help"
                        placeholder="NỘI DUNG"
                      ></textarea>
                    </div>
                    <div className="input-but mb-2">
                      <button
                        className="btn-signIn p-3 font-bold text-xl rounded-tr-full "
                        type="button"
                        onClick={() => this.handleSubmit(user.id)}
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default HoTro;
