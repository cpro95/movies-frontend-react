import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import {
  ListGroup,
  ListGroupItem,
  Progress,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

export default class Listmain extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(props.location.search);
    let tempIndex;
    if (isNaN(query.offset)) {
      console.log("error");
      tempIndex = 0;
    } else {
      tempIndex = parseInt(query.offset, 10);
    }
    this.state = {
      isLoading: false,
      currentIndex: tempIndex,
      movies: []
    };
  }

  componentDidMount() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });
    axios
      .get(
        `http://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?limit=10&offset=${
          this.state.currentIndex
        }`
      )
      .then(res => {
        // console.log(res.data);
        this.setState({
          isLoading: false,
          movies: res.data
        });
      })
      .catch(err => console.error(err));
  }

  handleCleanup(e) {
    this.props.history.go(0);
  }

  render() {
    const { isLoading, movies } = this.state;
    let previous = 0;
    let next = 0;

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
      if (this.state.currentIndex === 0) {
        previous = 0;
      } else {
        previous = this.state.currentIndex - 10;
      }
      next = this.state.currentIndex + 10;

      return (
        <div>
          <div>
            <ListGroup>
              {movies.map(movie => (
                <Link key={movie.idMovie} to={`/list/${movie.idMovie}`}>
                  <ListGroupItem>{movie.c00}</ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </div>

          <div className="row justify-content-center">
            <Pagination className="p-2" aria-label="Page navigation">
              <PaginationItem>
                <Link
                  onClick={this.handleCleanup.bind(this)}
                  to={`/list?offset=${previous}`}
                >
                  <PaginationLink previous />
                </Link>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink>{this.state.currentIndex / 10}</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <Link
                  onClick={this.handleCleanup.bind(this)}
                  to={`/list?offset=${next}`}
                >
                  <PaginationLink next />
                </Link>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      );
    }
  }
}
