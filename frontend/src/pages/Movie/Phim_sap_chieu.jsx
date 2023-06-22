import React from "react";
import Banner from "../../components/shared/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BuyTicket from "../../components/Buyticket/BuyTicket";

class Phim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
      category: [],
      selectedCategory: null,
    };
    this.updateMovieData = this.updateMovieData.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) });
    }
    fetch("http://localhost:8000/api/movies/coming/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data });
        data.map((data) => {
          this.setState({
            category: this.state.category.concat(data.category),
          });
        });
      });
  }
  updateMovieData(movies) {
    this.setState({ movies: movies }, () => {
      console.log(this.state.movies);
    });
  }

  handleSelectCategory(e) {
    const category = e.target.value;
    console.log("category", category);
    this.setState({ selectedCategory: category }, () => {
      if (this.state.selectedCategory != null) {
        fetch(
          `http://localhost:8000/api/search?q=${this.state.selectedCategory}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ movies: data }, () => {
              console.log(this.state.movies);
            });
          });
      }
    });
  }

  render() {
    const movieComponent = this.state.category.map((movie) => (
      <option value={movie} className="lg:text-lg text-sx">
        {movie}
      </option>
    ));
    const movieElement = this.state.movies?.map((movie) => {
      return (
        <div className="font-serif p-2 film-item cl-purple grid grid-cols-2 gap-2">
          <div>
            <img
              className="film-item-pic img"
              src={movie.poster}
              alt="poster"
            />
          </div>
          <div className="film-item-txt flex flex-col justify-between">
            <div>
              <a
                href={`/phim/${movie.id}`}
                className="font-bold uppercase text-white text-2xl text-left"
              >
                {movie.title}
              </a>
              <a href={`/phim/${movie.id}`}>
                <p className="text-ellipsis content"> {movie.content}</p>
              </a>
              <div class="flex items-center">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <p class="ml-1 text-sm font-bold text-gray-900 dark:text-white mb-0">4.95</p>
    <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
</div>

            </div>
            <div className="film-item-but align-items-center text-center lg:flex lg:flex-row flex flex-col justify-center lg:-space-x-10  space-x-0 ">
              <a
                href={`/trailer/${movie.id}`}
                className="mix-blend-normal trailler-btn rounded-full md:w-50 w-full justify-items-end text-slate-50 hover:text-slate-300 font-bold"
              >
                TRAILER
              </a>
              <a
                href={`/movie/${movie.id}`}
                className="mix-blend-normal cart-btn rounded-full md:w-50 w-full  text-slate-300 hover:text-slate-50"
              >
                MUA VÉ
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header user={this.state.user} updateMovieData={this.updateMovieData} />
        <Banner />
        <BuyTicket />
        <div className="font-serif container mt-3 mb-3 ">
          <div className="sub-tab text-center">
            <ul className="flex justify-center -space-x-14">
              <li className="mix-blend-normal rounded-r-full z-10 bg-amber-600	">
                <a href="/phim_dang_chieu" className="rounded-r-full">
                  Phim đang chiếu
                </a>
              </li>
              <li className="mix-blend-normal pl-14 rounded-r-full bg-yellow-400">
                <a
                  href="/phim_sap_chieu"
                  className="active rounded-r-full text-black cursor-auto"
                >
                  Phim sắp chiếu
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="font-serif container text-end">
          <div className="inline-flex justify-content-end mb-2 ">
            <div className="select-list flex w-full" data-cate="film">
              <select
                onChange={this.handleSelectCategory}
                className="form-select  select-header border-2 rounded-b-lg rounded-tr-full p-2 uppercase font-bold"
                aria-label="Default select example"
              >
                <option value={null}>Chọn thể loại</option>
                {movieComponent}
              </select>
            </div>
          </div>
        </div>
        <div className="font-serif container md:grid md:grid-cols-2 flex flex-col gap-2">
          {movieElement}
        </div>

        <Footer />
      </div>
    );
  }
}

export default Phim;
