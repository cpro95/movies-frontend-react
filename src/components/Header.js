import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Input,
  Form
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.history.push(`/search?${this.state.search}`);
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.value;
    await this.setState({
      search: value,
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link className="navbar-brand" to={'/'}>Newest</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              </NavItem>
              <NavItem>
                <Link className="nav-link active" to={'/list'}>List</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={'/about'}>About</Link>
              </NavItem>
            </Nav>
          </Collapse>
          <Form
            onSubmit={
              (e) => this.handleSubmit(e)
            }
          >
            <Input
              type="text"
              name="search"
              placeholder="Search..."
              onChange={
                (e) => this.handleChange(e)
              }
            />
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);