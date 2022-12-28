import { Component } from "react";
// import "../Buyticket/style.css"
class BuyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      dates: [],
      times: [],
      selectedMovie: -1,
      selectedDate: -1,
      selectedTime: -1,
    };
    this.handleSelectMovie = this.handleSelectMovie.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleSelectTime = this.handleSelectTime.bind(this);
  }
  componentDidMount() {
    fetch(`http://localhost:8000/api/movies/playing/`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data }, () => {
          console.log("movie: ", this.state.movies);
        });
      });
  }
  handleSelectMovie(e) {
    const id = e.target.value;
    this.setState({ selectedMovie: id }, () => {
      if (this.state.selectedMovie !== -1) {
        fetch(
          `http://localhost:8000/api/getshowtime/?fk_movie=${this.state.selectedMovie}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ dates: data }, () => {
              console.log("dates: ", this.state.dates);
            });
          });
      }
    });
  }
  handleSelectDate(e) {
    const id = e.target.value;
    this.setState({ selectedDate: id }, () => {
      if (this.state.selectedDate !== -1) {
        fetch(
          `http://localhost:8000/api/getdayshowtime/?fk_movie=${this.state.selectedMovie}&&fk_dayshowtime=${this.state.selectedDate}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ times: data }, () => {
              console.log("time: ", this.state.times);
            });
          });
      }
    });
  }

  handleSelectTime(e) {
    const id = e.target.value;
    this.setState({ selectedTime: id }, () => {
      if (
        this.state.selectedMovie !== -1 &&
        this.state.selectedDate !== -1 &&
        this.state.selectedTime !== -1
      ) {
        window.location.href = `/choose-user/${this.state.selectedMovie}?id_dayshowtime=${this.state.selectedDate}&&id_time=${this.state.selectedTime}`;
      }
    });
  }
  render() {
    const movieComponent = this.state.movies.map((movie) => (
      <option value={movie.id} className="lg:text-lg text-sx">
        {movie.title}
      </option>
    ));
    const dateComponent = this.state.dates.map((date) => (
      <option value={date.fk_dayshowtimes.id}>
        {date.fk_dayshowtimes.day_showtime}
      </option>
    ));
    const timeComponent = this.state.times?.map((time) => (
      <option value={time.fk_dayshowtimes.fk_showtime.id}>
        {time.fk_dayshowtimes.fk_showtime.time}
      </option>
    ));
    return (
      // <!-- ======= Mua vé nhanh ======= -->
      <div className="bg-gradient-to-r from-gray-100 to-sky-900">
        <div className="container grid grid-flow-col item-center ">
          <div className="grid grid-flow-row uppercase  item-center justify-content-center md:text-4xl text-lg font-bold p-2 text-red-500 mr-2 w-100">
            <p className="item-center">mua vé </p>
            <p className="item-center">nhanh</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 align-content-center item-center p-2 justify-content-center">
            <div className="select-list " data-cate="film">
              <select
                onChange={this.handleSelectMovie}
                className="form-select  select-header border-2 rounded-b-lg rounded-tr-full p-2 uppercase font-bold"
                aria-label="Default select example"
              >
                <option value={-1}>Chọn phim</option>
                {movieComponent}
              </select>
            </div>
            <div className="select-list " data-cate="film">
              <select
                onChange={this.handleSelectDate}
                className="form-select select-header border-2 rounded-b-lg rounded-tr-full p-2 uppercase font-bold"
                aria-label="Default select example"
              >
                <option value={-1}>Chọn ngày</option>
                {dateComponent}
              </select>
            </div>
            <div className="select-list " data-cate="film">
              <select
                onChange={this.handleSelectTime}
                className="form-select select-header border-2 rounded-b-lg rounded-tr-full p-2 uppercase font-bold bg-gray-500"
                aria-label="Default select example"
              >
                <option value={-1}>Chọn suất</option>
                {timeComponent}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyTicket;
