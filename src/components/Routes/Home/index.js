import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swiper from 'react-id-swiper';
import Loading from '../../Loading';
import DisplayInfo from '../../DisplayInfo';
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
    this._loadFetchData();
  }

  _loadFetchData() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });
    axios
      .get("https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies")
      .then(res => {
        // console.log(res.data);
        if (res.data === "No data found") {
          this.setState({
            isLoading: false,
            movies: []
          })
          return 0;
        }

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
      // effect:'coverflow',
      // grabCursor: true,
      // centeredSlides: true,
      // slidesPerView: 'auto',
      // coverflowEffect: {
      //   rotate: 50,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 1,
      //   slideShadows: true
      // },
      // loop: true,
      slidesPerView: 2,
      slidesPerColumn: 2,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // },
      spaceBetween: 10
    }

    // console.log("isLoading: " + isLoading);
    if (isLoading) {
      return (
        <Loading />
      );
    } else {
      if (items.length === 0) {
        return (
          <DisplayInfo
            variant="subheading"
            component="h3"
            body="No Data Found."
          />
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
}
