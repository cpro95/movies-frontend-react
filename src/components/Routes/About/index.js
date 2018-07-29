import React from "react";
import { Jumbotron } from "reactstrap";

export default class Other extends React.Component {
  constructor(props) {
    super(props);
    document.body.style.background = "white";
  }

  render() {
    return (
      <Jumbotron>
        <h1 className="display-2">Movies List</h1>
        <p className="lead">
          This is a simple Movies List App, using React, Reactstrap with Kodi
          Database
        </p>
        <hr className="my-2" />
        <p>
          Backend server with heroku app, Frontend App with reactjs.
          Thanks, heroku.com & ReactJS
        </p>
        <p className="lead">
          Contact me at <a href="http://github.com/cpro95">Github</a>
        </p>
      </Jumbotron>
    );
  }
}
