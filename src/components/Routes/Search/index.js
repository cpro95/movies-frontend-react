import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from '../../Loading';
import DisplayInfo from '../../DisplayInfo';
import 'url-search-params-polyfill';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        let query = new URLSearchParams(props.location.search).get("q");

        // Initialize  State
        this.state = {
            changedQuery: false,
            isLoading: false,
            query: query,
            movies: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        var query2 = new URLSearchParams(nextProps.location.search).get("q");
        if (prevState.query !== query2) {
            return {
                query: query2,
                changedQuery: true
            }
        } else {
            return null;
        }
    }

    componentDidMount() {
        this._loadFetchData();
    }

    componentDidUpdate() {
        if (this.state.changedQuery === true) {
            this._loadFetchData();
            this.setState({
                changedQuery: false
            })
        }
    }

    _loadFetchData() {
        document.body.style.background = "white";
        this.setState({ isLoading: true });
        axios
            .get(`https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?name=${this.state.query}`)
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
            slidesPerView: 2,
            slidesPerColumn: 2,
            // loop: true,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev'
            // }
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
                        component="h5"
                        body={`Search Result: ${items.length} Found.`}
                    />
                );
            } else {
                return (
                    <div>
                        <Swiper {...params}>
                            {slides}
                        </Swiper>
                        <DisplayInfo
                            variant="body1"
                            component="h5"
                            body={`Search Result: ${items.length} Found.`}
                        />
                    </div>
                );
            }
        }
    }
}
