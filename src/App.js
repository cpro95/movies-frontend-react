import React, { Component } from 'react';
// import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <Grid container>
        <Grid item lg={3} md={3} sm={2}>
        </Grid>
        <Grid item lg={6} md={6} sm={8} xs={12}>
          <Header />
          <Main />
        </Grid>
        <Grid item lg={3} md={3} sm={2}>
        </Grid>
      </Grid>
    );
  }
}

export default App;
