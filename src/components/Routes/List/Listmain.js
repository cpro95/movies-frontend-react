import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'url-search-params-polyfill';

import Loading from '../../Loading';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';


export default class Listmain extends React.Component {
  constructor(props) {
    super(props);
    let tempIndex = new URLSearchParams(props.location.search).get("offset");
    // console.log("tempIndex is : " + tempIndex);
    if (!tempIndex) {
      // console.log("error");
      tempIndex = 0;
    } else {
      tempIndex = parseInt(tempIndex, 10);
    }

    // Initialize state
    this.state = {
      isLoading: false,
      page: tempIndex,
      movies: []
    };
  }

  componentDidMount() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });
    axios
      .get(
        `https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?limit=10&offset=${
        this.state.page
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
    const { isLoading, movies, page } = this.state;
    let previous = 0;
    let next = 0;

    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      if (this.state.page === 0) {
        previous = 0;
      } else {
        previous = this.state.page - 10;
      }
      next = this.state.page + 10;
      movies.forEach(movie => {
        if (movie.idMovie === 1) {
          next = this.state.page;
        }
      });
      // console.log("in render : next is " + next);


      return (
        <div>
          <List component="nav">
            {movies.map(movie => (
              <Link
                to={`/list/${movie.idMovie}`}
                style={{ textDecoration: 'none' }}
              >
                <ListItem
                  button
                  key={movie.idMovie}
                  divider={true}
                >
                  {movie.c00}
                </ListItem>
              </Link>
            ))}
          </List>

          <div style={{ textAlign: 'center' }}>
            <IconButton
              onClick={this.handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="First Page"
            >
              <FirstPageIcon />
            </IconButton>

            <Link
              onClick={this.handleCleanup.bind(this)}
              to={`/list?offset=${previous}`}
            >
              <IconButton
                onClick={this.handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Link>

            {page / 10}

            <Link
              onClick={this.handleCleanup.bind(this)}
              to={`/list?offset=${next}`}
            >
              <IconButton
                onClick={this.handleNextButtonClick}
                // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </Link>

            <IconButton
              onClick={this.handleLastPageButtonClick}
              // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Last Page"
            >
              <LastPageIcon />
            </IconButton>
          </div>
        </div>
      );
    }
  }
}
