import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          {/* <NavbarBrand href="/">Movies-List</NavbarBrand> */}
          <Link className="navbar-brand" to={'/'}>Movies-List</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {/* <NavLink href="/xxxx">Test1</NavLink> */}
                <Link className="nav-link active" to={'/list'}>Total</Link>
              </NavItem>
              <NavItem>
                {/* <NavLink href="/xxxx">Test2</NavLink> */}
                <Link className="nav-link" to={'/about'}>About</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}