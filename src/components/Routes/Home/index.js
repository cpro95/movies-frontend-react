import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert, Card, CardImg, CardTitle, Progress } from "reactstrap";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      movies: []
    };
  }

  componentDidMount() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });
    axios
      .get("http://cpro95-movies-backend-express.herokuapp.com/api/v1/movies")
      .then(res => {
        // console.log(res.data);
        this.setState({
          isLoading: false,
          movies: res.data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { isLoading, movies } = this.state;
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
          <Alert color="light" className="text-center">
            List of movies which I have recently......
          </Alert>
          {movies.map(movie => (
            // <ListGroupItem key={movie.idMovie}>{movie.c00}</ListGroupItem>
            <Link to={`/list/${movie.idMovie}`}>
              <Card key={movie.idMovie}>
                <CardImg top width="100%" src={movie.c08} />
                <CardTitle className="text-center">{movie.c00}</CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      );
    }
  }
}
