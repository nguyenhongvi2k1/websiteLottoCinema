import React from "react";
import BuyTicket from "../../components/Buyticket/BuyTicket";
import Banner from "../../components/shared/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
    this.rating = this.rating.bind(this);
  }

  componentDidMount() {
    const jsonStr = localStorage.getItem("user");
    if (jsonStr != null) {
      this.setState({ user: JSON.parse(jsonStr) });
    }
    fetch("http://localhost:8000/api/movies/playing/")
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
      console.log("updateMovieData: ", this.state.movies);
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
  rating(e){
    <div className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Small modal
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                    </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="small-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                    <button data-modal-hide="small-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                </div>
            </div>
        </div>
    </div>
{/* <figure class="max-w-screen-md">
    <div class="flex items-center mb-4 text-yellow-300">
        <svg aria-hidden="true" class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    </div>
    <blockquote>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
    </blockquote>
    <figcaption class="flex items-center mt-6 space-x-3">
        <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="profile picture"/>
        <div class="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
            <cite class="pr-3 font-medium text-gray-900 dark:text-white">Bonnie Green</cite>
            <cite class="pl-3 text-sm text-gray-500 dark:text-gray-400">CTO at Flowbite</cite>
        </div>
    </figcaption>
</figure> */}

  }
  render() {
    const movieComponent = this.state.category.map((movie) => (
      <option value={movie} className="lg:text-lg text-sx">
        {movie}
      </option>
    ));
    const movieElement = this.state.movies?.map((movie) => {
      return (
        <div className="p-2 film-item cl-purple grid grid-cols-2 gap-2">
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

<div className="flex items-center">
    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white mb-0">4.95</p>
    <button onClick={this.rating} className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</button>





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
        <div className="font-serif container text-end">
          <div className="inline-flex justify-content-end mb-2 ">
            <div className="select-list flex w-4/5" data-cate="film">
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
        <div className="container md:grid md:grid-cols-2 flex flex-col gap-2">
          {movieElement}
        </div>

        <Footer />
      </div>
    );
  }
}

export default Phim;
