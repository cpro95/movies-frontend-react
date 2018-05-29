import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert, ListGroup, ListGroupItem } from 'reactstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      movies: []
    }
  }

  componentDidMount() {
    this.setState( {isLoading: true});
    axios.get('http://cpro95-movies-backend-express.herokuapp.com/api/v1/movies')
      .then( res => {
        // console.log(res.data);
        this.setState( {
          isLoading: false,
          movies: res.data
        });
      })
      .catch( err => (console.error(err)))
  }

  render() {
    const { isLoading, movies } = this.state;
    if (isLoading) {
      return <p>Loading...</p>
    }
    else {
      return(
        <div>
          <Alert color="light" className="text-center">
            List of movies which I have recently......
          </Alert>
          <ListGroup>
            { movies.map (movie => (
              <ListGroupItem key={movie.idMovie}>{movie.c00}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )
    }
  }
}