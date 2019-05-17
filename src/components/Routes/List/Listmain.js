import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'url-search-params-polyfill';

import Loading from '../../Loading';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

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
      movies: [],
      total: 0,
    };
  }

  componentDidMount() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });

    // get the total items count
    axios
      .get(
        `https://cpro95.herokuapp.com/api/v1/movies?total=1`
      )
      .then(res => {
        var total = parseInt(res.data.total, 10);
        this.setState({
          total: total
        });
        // console.log(this.state.total);
      })
      .catch(err => console.error(err));

    // get the list of 10 items
    axios
      .get(
        `https://cpro95.herokuapp.com/api/v1/movies?limit=10&offset=${
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

      if (this.state.page >= (this.state.total) - 10) {
        next = this.state.page;
      } else {
        next = this.state.page + 10;
      }

      // console.log("in render : next is " + next);


      return (
        <div>
          <List component="nav">
            {movies.map(movie => (
              <Link
                to={`/list/${movie.idMovie}`}
                style={{ textDecoration: 'none' }}
                key={movie.idMovie}
              >
                <ListItem
                  button
                  divider={true}
                >
                  <Avatar src={movie.c08} />
                  <ListItemText
                    primary={movie.c00}
                    secondary={`${parseFloat(movie.rating).toFixed(1)} / ${movie.premiered}`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>

          <div style={{ textAlign: 'center' }}>

            <Link
              onClick={this.handleCleanup.bind(this)}
              to={`/list?offset=0`}
            >
              <IconButton
                disabled={this.state.page === 0}
                aria-label="First Page"
              >
                <FirstPageIcon />
              </IconButton>
            </Link>

            <Link
              onClick={this.handleCleanup.bind(this)}
              to={`/list?offset=${previous}`}
            >
              <IconButton
                disabled={this.state.page === 0}
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
                disabled={this.state.total < this.state.page + 10}
                aria-label="Next Page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </Link>

            <Link
              onClick={this.handleCleanup.bind(this)}
              to={`/list?offset=${parseInt((this.state.total - 1)/10,10)*10}`}
            >
              <IconButton
                disabled={this.state.total <= this.state.page + 10}
                aria-label="Last Page"
              >
                <LastPageIcon />
              </IconButton>
            </Link>
          </div>
        </div>
      );
    }
  }
}
