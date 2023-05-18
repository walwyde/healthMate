import React, { Fragment } from "react";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import "../index.css";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";

const Landing = (props) => {
  return (
    <div className="landing">
      <div className="landing-text-container px-5">
        <h1 className="text-center mt-2">Welcome to Healthmate</h1>
        <h5 className="text-center"> Your personal health companion</h5>
        <p className="intro-text">
          <span className="text-primary text-lead">At HealthMate,</span> we believe that true well-being
          encompasses not only physical fitness but also mental and emotional
          harmony. We understand that leading a healthy lifestyle can sometimes
          feel overwhelming, but worry not! Our dedicated team is here to guide
          and support you every step of the way.
          
          <span>
            Our user-friendly interface and intuitive features make navigating
            the HealthMate platform a breeze. But HealthMate is more than just a
            digital platform. We foster a vibrant community of like-minded
            individuals who share their experiences, provide support, and
            inspire one another. Connect with fellow HealthMate users, join
            challenges, and celebrate milestones together. Together, we can
            achieve more.
          </span>
         
        </p>
      </div>
      <div className="centered">
        <Button className="" variant="primary">
          Get Started
        </Button>
      </div>
      <footer className="bg-dark text-light buttom-fixed">
        <p>healthMate &copy; 2023 All Rights Reserved</p>
      </footer>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
