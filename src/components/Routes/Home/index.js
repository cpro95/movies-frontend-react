import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Progress } from 'reactstrap';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';


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
      .get("https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies")
      .then(res => {
        // console.log(res.data);
        let items = [];

        res.data.map(movie => {
          items.push({
            src: movie.c08,
            altText: movie.c00,
            caption: movie.c00,
            idMovie: movie.idMovie
          });
          return 0;
        });

        this.setState({
          isLoading: false,
          movies: items
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { isLoading, movies } = this.state;

    const items = movies;

    const slides = items.map(item => {
      return (
        <Link key={item.idMovie} to={`/list/${item.idMovie}`}>
          <img width="100%" src={item.src} alt={item.altText} />
        </Link>
      );
    });

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 30
    }

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
        <Swiper {...params}>
          {slides}
        </Swiper>
      );
    }
  }
}
