import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Register = props => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }
  return (
    <div>
    {/* <form method="POST">
  <label for="fullName">Full Name:</label>
  <input type="text" id="fullName" name="fullName" required />

  <label for="dateOfBirth">Date of Birth:</label>
  <input type="date" id="dateOfBirth" name="dateOfBirth" required />

  <label for="gender">Gender:</label>
  <select id="gender" name="gender" required>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Non-binary">Non-binary</option>
    <option value="Other">Other</option>
  </select>

  <label for="address">Address:</label>
  <input type="text" id="address" name="address" required />

  <label for="phone">Phone:</label>
  <input type="tel" id="phone" name="phone" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <label for="identificationNumber">Identification Number:</label>
  <input type="text" id="identificationNumber" name="identificationNumber" required />

  <label for="institution">Institution:</label>
  <input type="text" id="institution" name="institution" required />

  <label for="degree">Degree:</label>
  <input type="text" id="degree" name="degree" required />

  <label for="year">Year:</label>
  <input type="number" id="year" name="year" required />

  <label for="specialization">Specialization:</label>
  <input type="text" id="specialization" name="specialization" />

  <label for="professionalDesignation">Professional Designation:</label>
  <input type="text" id="professionalDesignation" name="professionalDesignation" required />

  <label for="licenseNumber">License Number:</label>
  <input type="text" id="licenseNumber" name="licenseNumber" required />

  <label for="expiryDate">License Expiry Date:</label>
  <input type="date" id="expiryDate" name="expiryDate" required />

  <label for="organization">Organization:</label>
  <input type="text" id="organization" name="organization" required />

  <label for="organizationContact">Organization Contact:</label>
  <input type="text" id="organizationContact" name="organizationContact" required />

  <label for="employer">Employer:</label>
  <input type="text" id="employer" name="employer" required />

  <label for="position">Position:</label>
  <input type="text" id="position" name="position" required />

  <label for="startDate">Start Date:</label>
  <input type="date" id="startDate" name="startDate" required />

  <label for="endDate">End Date:</label>
  <input type="date" id="endDate" name="endDate" required />

  <label for="languages">Languages:</label>
  <input type="text" id="languages" name="languages" />

  <label for="skills">Skills:</label>
  <input type="text" id="skills" name="skills" />

  <label for="areasOfExpertise">Areas of Expertise:</label>
  <input type="text" id="areasOfExpertise" name="areasOfExpertise" />

  <input type="submit" value="Submit" />

  </form> */}

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  </div>
  )
}

Register.propTypes = {}

export default Register