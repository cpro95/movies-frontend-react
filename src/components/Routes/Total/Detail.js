import React from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import {
  Progress,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText
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
        `http://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?id=${
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
          <Progress animated value={50}>
            50%
          </Progress>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Card className="px-2">
              <Button
                color="primary"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </Button>
              <CardTitle className="py-3 text-center">{movie.c00}</CardTitle>
              <CardSubtitle className="py-2">{movie.c03}</CardSubtitle>
              <CardText>{movie.c01}</CardText>
              <CardImg className="p-0 m-0" src={movie.c08} />
            </Card>
          </div>
        </div>
      );
    }
  }
}
