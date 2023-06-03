import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { login } from "../../Actions/auth";
import { connect } from "react-redux";

const Login = ({ login, history, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData, history);
  };
  
  return isAuthenticated ? (<Redirect to={"/profile"}  />) : ( 
  <Fragment>
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
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>

  <h6 className="text-muted mt-3">Already have an account?</h6>

  <Link to="/register" className="text-decoration-none m-2">
    Register
  </Link>
  </Fragment>
  )
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(null, { login })(withRouter(Login));
