import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";
import PropTypes from "prop-types";

const Navigation = ({ isAuthenticated, logout }) => {
  const authLinks = () => {
    return (
      <div>
        <ul className="navbar-nav">
          <li className="nav-item"></li>
          <li className="nav-item">
            <Link to="/messages">Messages</Link>
          </li>
         { <li className="nav-item">
            <Link to="/appointments">Appointments</Link>
          </li>}
          <li className="nav-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const guestLinks = () => {
    return (
      <Fragment>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/health-tips">Tour</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </Fragment>
    );
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >
          <Link to="/">
        <img src="/HealthMate.png" alt="HealthMate" className="navbar-brand"  />
        </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated ? authLinks() : guestLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navigation);
