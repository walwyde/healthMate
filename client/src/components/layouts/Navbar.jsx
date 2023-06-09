import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";
import PropTypes from "prop-types";

const Navigation = ({ isAuthenticated, logout, message: {newMessages} }) => {
  const authLinks = () => {
    return (
      <div>
        <ul className="navbar-nav">
          <li className="nav-item"></li>
          <li className="nav-item">
          <Link className="nav-link" to="/messages"><span className="sm badge badge-info">{newMessages.length}</span>Messages</Link>
          </li>
         { <li className="nav-item">
            <Link className="nav-link" to="/appointments">Appointments</Link>
          </li>}
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={logout}>
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
        <ul className="navbar-nav ml-5">
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/health-tips">Tour</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Register</NavLink>
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
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  message: state.message,
});

export default connect(mapStateToProps, { logout })(Navigation);
