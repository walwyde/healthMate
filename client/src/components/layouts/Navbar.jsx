import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  const authLinks = (
    <Fragment>
      <Nav className="me-auto">
        <Nav.Link href="/messages">Messages</Nav.Link>
        <Nav.Link href="/profile">Proile</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/appointments">Appointments</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/about">About US</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="/login">Logout</Nav.Link>
      </Nav>
    </Fragment>
  );

  const guestLinks = (
    <>
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link eventKey={2} href="/register">
          Register
        </Nav.Link>
      </Nav>
    </>
  );
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">HealthMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {guestLinks}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
