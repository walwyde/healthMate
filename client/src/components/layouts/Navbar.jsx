import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

const Navbar = () => {
  // const toggleMenu = () => {
  //   function toggleMenu() {
  //     var menu = document.querySelector(".navbar-menu");
  //     menu.classList.toggle("show");
  //   }
  // };

  const guestLinks = <Fragment></Fragment>;
  const AuthLinks = <Fragment></Fragment>;
  return (
    <Fragment>
      <input type="checkbox" id="navbar-toggle" />
      <label for="navbar-toggle" class="menu-icon"></label>

      <div class="navbar">
        <a href="#" class="active">
          Healthmate
        </a>
        <div class="navbar-menu">
          <a href="#">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
