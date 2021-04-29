import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";



export default class NavbarComponent extends Component {
  render() {
    let buttons;

    if(this.props.user) {
      buttons = (
        <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link  onClick={() => localStorage.clear()} as={Link} to="/logout"> 
          Logout
        </Nav.Link>
      </Nav>
      )
    }else{
      buttons = (
        <Nav className="mr-auto">
           <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </Nav>
      )
    }
    return (
      <div>
        <Navbar variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Kasir App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {buttons}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
