import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import Loading from '../../Loading';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

const styles = {
  card: {
    width: '100%',
  },

  media: {
    // maxWidth:'100%',
    height: 0,
    paddingTop: '56.25%', // 16:9
    paddingBottom: '100%',
  },
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      movie: {},
    };
  }

  componentDidMount() {
    this._loadFetchData();
  }

  _loadFetchData() {
    document.body.style.background = "white";
    this.setState({ isLoading: true });
    axios
      .get(
        `https://cpro95-movies-backend-express.herokuapp.com/api/v1/movies?id=${
        this.props.match.params.id
        }`
      )
      .then(res => {
        //   console.log(res.data);
        this.setState({
          isLoading: false,
          movie: res.data[0],
        });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate() {
    document.body.style.background = "black";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100%";
    document.body.style.backgroundImage = "url(" + this.state.movie.c20 + ")";
  }
  render() {
    const { isLoading, movie } = this.state;
    const { classes } = this.props;

    if (isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      var youtube_link;
      var link_str;
      var target_str = "" + movie.c19;

      link_str = target_str.substr(target_str.indexOf('videoid') + 8, target_str.length);
      youtube_link = `http://www.youtube.com/watch?v=${link_str}`;

      var title = "";

      if (movie.c00 !== movie.c16) {
        title = movie.c00 + " (" + movie.c16 + ")";
      } else {
        title = movie.c00;
      }

      return (
        <Card className={classes.card}>

          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              {title}
            </Typography>

            <Typography gutterBottom variant="title" component="h3">
              {movie.c03}
            </Typography>

            <Typography variant="body2">
              {movie.c01}
            </Typography>

            <Typography style={{ marginTop: 10 }} gutterBottom variant="body1">
              Rating:
              <Badge style={{ marginLeft: 15, marginRight: 20 }} color="primary" badgeContent={movie.rating} />
              Date: {movie.premiered}
            </Typography>
          </CardContent>

          <CardMedia
            className={classes.media}
            image={movie.c08}
            title={movie.c00}
          />

          <CardActions>
            <a
              style={{ textDecoration: 'none' }}
              href={youtube_link}
            >
              <Button size="small" color="primary">
                View Trailer
              </Button>
            </a>
            <a
              style={{ textDecoration: 'none' }}
              href={`http://www.imdb.com/title/${movie.uniqueid_value}`}
            >
              <Button size="small" color="primary">
                Learn More
              </Button>
            </a>
          </CardActions>
        </Card>
      );
    }
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);