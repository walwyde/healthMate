import React, { useState } from "react";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { createProfile } from "../../Actions/profile";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const CreateProfile = ({createProfile, history}) => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nin: '',
    professionalDesignation: '',
    address: '',
    phone: '',
    number: '',
    expiryDate: '',
    type: '',
    email: '',
    password: '',
    confirmPass: ''
  });
  const {
    fullName,
    dateOfBirth,
    gender,
    nin,
    professionalDesignation,
    address,
    phone,
    number,
    expiryDate,
    type,
    email,
    password,
    confirmPass
  } = formData;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return event.preventDefault();
      event.stopPropagation();
    }

    console.log(formData);
    event.preventDefault();
    setValidated(true);
    createProfile(formData, history, "staff")
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            value={fullName}
            name="fullName"
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Enter Full Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>dateOfBirth</Form.Label>
          <Form.Control
            required
            value={dateOfBirth}
            name="dateOfBirth"
            onChange={(e) => onChange(e)}
            type="date"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            required
            value={gender}
            name="gender"
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Enter Your Gender"
          />
          <Form.Control.Feedback>
            Options: Male, Female, Others!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            value={address}
            name="address"
            type="text"
            placeholder="Enter Work Address"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            value={phone}
            type="text"
            name="phone"
            placeholder="Enter Contact Phone"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone Number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            value={email}
            name="email"
            type="email"
            placeholder="Enter a Valid Email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom07">
          <Form.Label>NIN</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => onChange(e)}
            value={nin}
            name="nin"
            placeholder="Enter your NIN"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid NIN.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom08">
          <Form.Label>Professional Designation</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            value={professionalDesignation}
            name="professionalDesignation"
            type="text"
            placeholder="Professional Designation"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide this Info.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom09">
          <Form.Label>License Type</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            value={type}
            name="type"
            type="text"
            placeholder="Enter Licence Type"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide this Info.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom10">
          <Form.Label>License Number</Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            value={number}
            name="number"
            type="text"
            placeholder="Enter Licence Number"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide this Info.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom11">
          <Form.Label>License Expiry Date</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => onChange(e)}
            value={expiryDate}
            name="expiryDate"
            placeholder="Enter Licence Expiry Date"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide this Info.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom12">
          <Form.Label>Create Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => onChange(e)}
            value={password}
            name="password"
            placeholder="********"
            required
          />
          <Form.Control.Feedback type="invalid">
            You Must Have A Login Pass.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom13">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => onChange(e)}
            value={confirmPass}
            name="confirmPass"
            placeholder="********"
            required
          />
          <Form.Control.Feedback type="invalid">
            You Must Have A Login Pass.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit" >
        Submit form
      </Button>
    </Form>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, {createProfile})(withRouter(CreateProfile));
