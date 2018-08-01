import React from "react";
import axios from "axios";

import Loading from '../../Loading';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '100%',
  },

  media: {
    // maxWidth:'100%',
    // height:'100%',
    paddingTop: '56.25%', // 16:9
    paddingBottom: '100%',
  },
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      movie: {}
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
          movie: res.data[0]
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
      return (
        <Card className={classes.card}>

          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {movie.c00}
            </Typography>

            <Typography gutterBottom variant="subheading" component="h4">
              {movie.c03}
            </Typography>

            <Typography component="p">
              {movie.c01}
            </Typography>
          </CardContent>

          <CardMedia
            className={classes.media}
            image={movie.c08}
            title="Movie Poster"
          />

          <CardActions>
            <Button size="small" color="primary">
              Share
          </Button>
            <Button size="small" color="primary">
              Learn More
          </Button>
          </CardActions>
        </Card>
      );
    }
  }
}

export default withStyles(styles)(Detail);