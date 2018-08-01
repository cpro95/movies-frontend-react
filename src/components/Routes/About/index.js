import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
  },
};

class About extends React.Component {
  constructor(props) {
    super(props);
    document.body.style.background = "white";
  }

  render() {
    const { classes } = this.props;
    
    return (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="headline" component="h1">
              My Movies
            </Typography>
            <Typography component="p">
                This is a simple App which shows movies.
                <br />
                You can search movies with name.
                <br />
                using React, Reactstrap, SwiperJS with Kodi Database.
            </Typography>

            <hr />

            <Typography component="p">
              Backend server with heroku app, Frontend App with reactjs.
            <br />
              Thanks, heroku.com & ReactJS
            </Typography>

            <hr />
          </CardContent>

          <a style={{ textDecoration: 'none' }} href="http://github.com/cpro95">
            <CardActions>
              <Button size="small">Source: Github</Button>
            </CardActions>
          </a>
        </Card>
    );
  }
}

export default withStyles(styles)(About);