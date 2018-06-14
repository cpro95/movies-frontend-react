import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Progress,
  Carousel,
  CarouselItem,
  CarouselCaption,
  CarouselIndicators,
  CarouselControl
} from "reactstrap";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isLoading: false,
      movies: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.movies.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.movies.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
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
    const { activeIndex, isLoading, movies } = this.state;

    const items = movies;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <Link to={`/list/${item.idMovie}`}>
            <img width="100%" src={item.src} alt={item.altText} />
          </Link>
          <CarouselCaption captionHeader={item.caption} captionText={item.caption}/>
        </CarouselItem>
      );
    });

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
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </div>
      );
    }
  }
}
