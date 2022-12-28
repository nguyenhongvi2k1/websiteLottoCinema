import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import NewPassword from "./pages/ForgotPassword/NewPassword";

import Phim from "./pages/Movie/Phim";
import Phim_sap_chieu from "./pages/Movie/Phim_sap_chieu";
import ChiTiet from "./pages/Movie/ChiTiet";
import Trailer from "./pages/Movie/Trailer";

import LichChieu from "./pages/Showtimes/LichChieu";
import ChooseUser from "./pages/Showtimes/ChooseUser";
import ChooseChair from "./pages/Showtimes/ChooseChair";
import Payment from "./pages/Showtimes/Payment";
import Food from "./pages/Showtimes/Food";
import Cards_Schedule_number from "./pages/Showtimes/Cards_Schedule_number";

import Home from "./pages/Home/Home";
import GioiThieu from "./pages/Information/GioiThieu";
import GiaVe from "./pages/Money_ticket/GiaVe";
import UuDai from "./pages/endow/UuDai";
import HoTro from "./pages/Help/HoTro";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/gia-ve" component={GiaVe} />
        <Route path="/uu-dai" component={UuDai} />
        <Route path="/ho-tro" component={HoTro} />
        <Route path="/gioi-thieu" component={GioiThieu} />

        <Route path="/phim_dang_chieu" component={Phim} />
        <Route path="/phim_sap_chieu" component={Phim_sap_chieu} />
        <Route path="/phim/:id_movie" component={ChiTiet} />
        <Route path="/trailer/:id_movie" component={Trailer} />

        <Route path="/lich-chieu" component={LichChieu} />
        <Route path="/movie/:id_movie" component={Cards_Schedule_number} />
        <Route path="/choose-user/:id_movie" component={ChooseUser} />
        <Route path="/choose-chair" component={ChooseChair} />
        <Route path="/payment" component={Payment} />
        <Route path="/food" component={Food} />

        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/new-password" component={NewPassword} />
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
