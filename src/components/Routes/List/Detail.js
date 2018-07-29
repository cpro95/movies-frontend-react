import React from "react";
import axios from "axios";
import {
  Progress,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col
} from "reactstrap";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      movie: {}
    };
  }

  componentDidMount() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });
    axios
      .get(
        `https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?id=${
        this.props.match.params.id
        }`
      )
      .then(res => {
        //   console.log(res.data);
        this.setState({
          isLoading: false,
          movie: res.data[0]
        });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate() {
    document.body.style.background = "black";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100%";
    document.body.style.backgroundImage = "url(" + this.state.movie.c20 + ")";
  }
  render() {
    const { isLoading, movie } = this.state;
    console.log(movie.idMovie);
    if (isLoading) {
      return (
        <div>
          <div className="text-center">Loading...</div>
          <Progress animated color="danger" value="100" />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Card className="px-2">
              <Row>
                <Col sm="2" xs="2">
                  <Button
                    color="info"
                    onClick={() => this.props.history.goBack()}
                  >
                    Back
                  </Button>
                </Col>
                <Col sm="10" xs="10">
                </Col>
              </Row>
              <CardTitle className="display-4 text-center">
                {movie.c00}
              </CardTitle>
              <CardSubtitle className="py-2 display-5">{movie.c03}</CardSubtitle>
              <hr className="my-2" />
              <CardText>{movie.c01}</CardText>
              <CardImg className="p-0 m-0" src={movie.c08} />
            </Card>
          </div>
        </div>
      );
    }
  }
}
