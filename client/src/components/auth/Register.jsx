import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { register } from "../../Actions/auth";
import { connect } from "react-redux";

const Register = ({ register, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    condition: false,
  });

  const { email, password, name, password2, condition } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [selectedOption, setSelectedOption] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // register(formData, history);
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          name="email"
          onChange={(e) => onChange(e)}
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          name="name"
          onChange={(e) => onChange(e)}
          placeholder="Please enter your full name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheck">
        <Form.Label>Condition</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={condition}
          onChange={(e) => onChange(e)}
          name="condition"
          required
        >
          <option>Select Your Medical Condition</option>
          <option
            name="diabetic"
            value={true}
          >
            Diabetic
          </option>
          <option
            name="hypertensive"
            value={true}
          >
            Hypertensive
          </option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={(e) => onChange(e)}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password2}
          name="password2"
          onChange={(e) => onChange(e)}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(withRouter(Register));
