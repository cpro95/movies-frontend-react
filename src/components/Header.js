import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Input,
  Form,
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      search: ""
    };
    
    this.toggle = this.toggle.bind(this);
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
    const search = this.state.search;
    this.setState({
      search: ""
    });
    this.props.history.push(`/search?q=${search}`);
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
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="navbar-brand" to={'/'}>Home</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link active" to={'/list'}>List</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={'/about'}>About</Link>
              </NavItem>
              <NavItem>
                <Form
                  onSubmit={
                    (e) => this.handleSubmit(e)
                  }
                >
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={
                      (e) => this.handleChange(e)
                    }
                  />
                </Form>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);