import React, { Fragment } from "react";
import Button from "react-bootstrap/esm/Button";
import Image from 'react-bootstrap/Image'
import Container from "react-bootstrap/esm/Container";
import {Row, Col} from 'react-bootstrap'
import '../index.css'
import Stack from 'react-bootstrap/Stack'
import PropTypes from "prop-types";

const Landing = (props) => {
  return (
    <Container className="landing p-3 justify" >
      <Row>
        <Col>
      <h1 className="text-center mt-5">Welcome to Healthmate</h1>
        </Col>
      </Row>
      <p className="text-center"> Your personal health companion</p>
        <Row className="justify-content-center align-items-center">
          <Col>
      <Button className='bg-secondary' variant='dark'>
        Get Started
      </Button>
          </Col>
        </Row>
      <footer className="bg-dark text-light buttom-fixed">
        <p>healthMate &copy; 2023 All Rights Reserved</p>
      </footer>
    </Container>
  );
};

Landing.propTypes = {};

export default Landing;
