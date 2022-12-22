import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar";
import { Button, Form } from "react-bootstrap";
var bgColors = {
  Default: "#e00d7a",
  Blue: "#00B1E1",
  Cyan: "#37BC9B",
  Green: "#8CC152",
  Red: "#E9573F",
  Yellow: "#F6BB42",
};
function User() {
  const onSubmit = async () => {
    const title = document.getElementById("title").value;
    const image = document.getElementById("poster").value;
    const link = document.getElementById("link").value;
    const category = document.getElementById("category").value;
    const director = document.getElementById("director").value;
    const actor = document.getElementById("actor").value;
    const time_movie = document.getElementById("time").value;
    const upcoming = document.getElementById("upcoming").value;
    const content = document.getElementById("content").value;
    const body_data = {
      title,
      image,
      link,
      category,
      director,
      actor,
      time_movie,
      upcoming,
      content,
    };
    console.log("body_data : ", body_data);

    const response = await fetch(
      "http://localhost:8000/admin/addmovie/insert_movie",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        // referrerPolicy: 'no-referrer',
        body: JSON.stringify(body_data), // body data type must match "Content-Type" header
      }
    );
    console.log("response", response);
    if (response.status === 201) {
      window.location.href = "/admin-movie";
    }
  };

  const btnStyle = {
    backgroundColor: "#F18720",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    paddingBottom: "inherit",
    borderRadius: "15px",
    textAlign: "center",
    marginLeft: "45%",
    width: "7rem",
    height: "2.5rem",
  };
  const textStyle = {
    fontFamily: "Helvetica",
    fontSize: "16px",
  };
  const background = {
    backgroundColor: "rgb(52 66 80)",
    color: "whitesmoke"
  };
  return (
    <div className="Sidebar-container" style={background}>
      <SideBar />
      <div >
        <div className="container" style={{ left:'-12.5%'}}>
          <div className="row" style={{ width: "145%" , backgroundColor:"rgb(52 66 80)", left: '-100px'}}>
              <Form
                className=" w-80 p-5"
                style={textStyle}
              >
                <h1>ADD MOVIE</h1>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    placeholder="Input title..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Poster</Form.Label>
                  <Form.Control
                    type="text"
                    id="poster"
                    placeholder="Input poster..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Link trailer</Form.Label>
                  <Form.Control
                    type="text"
                    id="link"
                    placeholder="Input link trailer..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    id="category"
                    placeholder="Input category..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Actor</Form.Label>
                  <Form.Control
                    type="text"
                    id="actor"
                    placeholder="Input actor..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Director</Form.Label>
                  <Form.Control
                    type="text"
                    id="director"
                    placeholder="Input director..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="text"
                    id="time"
                    placeholder="Input time..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upcoming</Form.Label>
                  <Form.Control
                    type="text"
                    id="upcoming"
                    placeholder="true/false"
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    id="content"
                    placeholder="Input content..."
                    style={{backgroundColor:" #eee"}}
                  />
                </Form.Group>
                <Button
                 
                  type="button"
                  className=" border border-light btn-click"
                  style={btnStyle}
                  onClick={onSubmit}
                >
                  SUBMIT
                </Button>
              </Form>
            </div>
          </div>
        </div>  
      </div>
  );
}

export default User;
