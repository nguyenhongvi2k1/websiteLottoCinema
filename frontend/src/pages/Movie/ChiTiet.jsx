import { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Banner from "../../components/shared/Banner";
import "bootstrap/dist/css/bootstrap.min.css";

class ChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_movie: this.props.match.params.id_movie,
      user: null,
    };
  }

  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) });
    }
    const id_movie = this.props.match.params.id_movie;
    fetch(`http://localhost:8000/api/movies/detail/${id_movie}`)
      .then((res) => res.json())
      .then((data) => this.setState({ id_movie: data }));
  }
  render() {
    return (
      <>
        <Header user={this.state.user} />
        <Banner />
        <BuyTicket />
        <div className="font-serif container mb-5">
          <div className=" mt-3 mb-3 ">
            <div className="sub-tab text-center">
              <ul className="flex justify-center -space-x-14">
                <li className="mix-blend-normal rounded-r-full z-10  bg-yellow-400">
                  <a
                    href="/phim_dang_chieu"
                    className="active rounded-r-full text-black cursor-auto"
                  >
                    Phim đang chiếu
                  </a>
                </li>
                <li className="mix-blend-normal pl-14 rounded-r-full bg-amber-600">
                  <a href="/phim_sap_chieu" className=" rounded-r-full ">
                    Phim sắp chiếu
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid grid-cols-3 bg-gray-900	rounded-lg  hidden">
            <div className="">
              <img
                src={this.state.id_movie.poster}
                alt="poster"
                className="film-item-pic w-auto"
              />
            </div>
            <div className="film-item-txt col-span-2 p-5">
              <h3 className="lg:text-xl text-base">
                {this.state.id_movie.title}
              </h3>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">
                  Khởi chiếu:
                </span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.date_premiere}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">Thể loại:</span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.category}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">Diễn viên:</span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.actor}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">Đạo diễn:</span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.director}
                </span>
              </div>
              <div className="film-item-type">
                <span className="icon-2d"></span>
              </div>
              <p className="lg:text-base text-sm">
                {this.state.id_movie.content}
              </p>
              <div className="flex items-center mb-3 mt-2">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white mb-0">4.95 out of 5</p>
            </div >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
              <div className="w-full bottom-0">
                <div className=" text-center -space-x-10">
                  <a
                    href={`/trailer/${this.state.id_movie.id}`}
                    className="mix-blend-normal trailler-btn  inline-block rounded-full w-50 lg:w-25 justify-items-end text-slate-50 hover:text-slate-300 font-bold"
                  >
                    TRAILER
                  </a>
                  <a
                    href={`/movie/${this.state.id_movie.id}`}
                    className="mix-blend-normal cart-btn inline-block rounded-full  w-50 lg:w-25 text-slate-300 hover:text-slate-50"
                  >
                    MUA VÉ
                  </a>
                </div>
              </div>

            </div>
          </div>
          <div className=" bg-gray-900	rounded-lg block md:hidden">
            <div className="">
              <img
                src={this.state.id_movie.poster}
                alt="poster"
                className="film-item-pic w-auto"
              />
            </div>
            <div className="film-item-txt col-span-2 p-5">
              <h3 className="text-base">{this.state.id_movie.title}</h3>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">
                  Khởi chiếu:
                </span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.date_premiere}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">Thể loại:</span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.category}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">Diễn viên:</span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.actor}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title lg:text-base text-sm">Đạo diễn:</span>
                <span className="l-value lg:text-base text-sm rounded-tr-3xl rounded-bl-3xl">
                  {this.state.id_movie.director}
                </span>
              </div>
              <div className="film-item-type">
                <span className="icon-2d"></span>
              </div>
              <p className="lg:text-base text-sm">
                {this.state.id_movie.content}
               
              </p>
              <div className="w-full bottom-0">
                <div className=" text-center space-x-5">
                  <a
                    href={`/trailer/${this.state.id_movie.id}`}
                    className="mix-blend-normal trailler-btn text-base rounded-full w-full justify-items-end text-slate-50 hover:text-slate-300 font-bold"
                  >
                    TRAILER
                  </a>
                  <a
                    href={`/movie/${this.state.id_movie.id}`}
                    className="mix-blend-normal cart-btn rounded-full w-full text-slate-300 hover:text-slate-50"
                  >
                    MUA VÉ
                  </a>
                </div>
              </div>


            </div>
            <div className="flex items-center mb-3">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">4.95 out of 5</p>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
            {/* <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">5 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded w-75"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">4 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded w-20" ></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">17%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">3 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded w-10" ></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">8%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">2 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded w-5" ></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">4%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">1 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded w-1" ></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">1%</span>
            </div>    */}
          </div>





        </div>
        <Footer />
      </>
    );
  }
}

export default ChiTiet;
