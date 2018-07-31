import React, { Component } from 'react';
// import './App.css';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={2}>
          </Col>
          <Col sm={8}>
            <Header />
            <Main />
          </Col>
          <Col sm={2}>
          </Col>
      </Row>
      </Container>
    );
  }
}

export default App;
