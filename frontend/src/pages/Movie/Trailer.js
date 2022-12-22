import { Component } from "react";
import ReactPlayer from "react-player";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

class Trailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id_movie,
      user: null,
    };
  }
  componentDidMount() {
    fetch(`http://localhost:8000/api/movies/detail/${this.state.id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ id: data }));
  }

  render() {
    return (
      <>
        <Header user={this.state.user} />
        <div className="container Trailer my-2">
          <ReactPlayer
            url={this.state.id.trailer}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <Footer />
      </>
    );
  }
}

export default Trailer;
