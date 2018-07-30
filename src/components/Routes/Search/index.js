import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Progress } from 'reactstrap';
import 'url-search-params-polyfill';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        let query = new URLSearchParams(props.location.search).get("q");

        // Initialize  State
        this.state = {
            isLoading: false,
            query: query,
            movies: []
        };
    }

    componentDidMount() {
        document.body.style.background = "white";
        this.setState({ isLoading: true });
        axios
            .get(`https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?name=${this.state.query}`)
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
            slidesPerView: 2,
            // slidesPerColumn: 2,
            loop: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev'
            // }
        }

        if (isLoading) {
            return (
                <div>
                    <div className="text-center">Loading...</div>
                    <Progress animated color="danger" value="100" />
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
