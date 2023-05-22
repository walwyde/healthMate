import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getProfileById } from "../../Actions/profile";
import { editProfile } from "../../Actions/profile";
import { connect } from "react-redux";

const EditUserProfile = ({
  profile: { profile, loading },
  getProfileById,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params._id);
  }, [loading]);

  const [formData, setFormData] = useState({
    name: !profile.loading && profile.name ? profile.name : "",
    age: !profile.loading && profile.age ? profile.age : "",
    gender: !profile.loading && profile.gender ? profile.gender : "",
    address: !profile.loading && profile.address ? profile.address : "",
    phone: !profile.loading && profile.phone ? profile.phone : "",
    systolic: !profile.loading && profile.systolic ? profile.systolic : "",
    diastolic: !profile.loading && profile.diastolic ? profile.diastolic : "",
    medName: !profile.loading && profile.medName ? profile.medName : "",
    medDose: !profile.loading && profile.medDose ? profile.medDose : "",
    frequency: !profile.loading && profile.frequency ? profile.frequency : "",
    otherHealthConditions:
      !profile.loading && profile.otherHealthConditions
        ? profile.otherHealthConditions
        : "",
    allergies: !profile.loading && profile.allergies ? profile.allergies : "",
    emergencyContact:
      !profile.loading && profile.emergencyContact
        ? profile.emergencyContact
        : "",
    familyHistory:
      !profile.loading && profile.profileHistory ? profile.profileHistory : "",
  });

  const {
    name,
    age,
    gender,
    address,
    phone,
    systolic,
    diastolic,
    medName,
    medDose,
    frequency,
    otherHealthConditions,
    allergies,
    emergencyContact,
    familyHistory,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData, history);
  };
  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          name="name"
          onChange={(e) => onChange(e)}
          placeholder="Enter name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          name="age"
          onChange={(e) => onChange(e)}
          placeholder="Enter age"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="age">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          type="text"
          value={gender}
          name="gender"
          onChange={(e) => onChange(e)}
          placeholder="Enter gender"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          name="phone"
          onChange={(e) => onChange(e)}
          placeholder="Enter phone"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="systolic">
        <Form.Label>Systolic Reading</Form.Label>
        <Form.Control
          type="text"
          value={systolic}
          name="systolic"
          onChange={(e) => onChange(e)}
          placeholder="Enter systolic reading"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Diastolic</Form.Label>
        <Form.Control
          type="text"
          value={diastolic}
          name="age"
          onChange={(e) => onChange(e)}
          placeholder="Enter Diastolic"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          name="age"
          onChange={(e) => onChange(e)}
          placeholder="Enter age"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          name="age"
          onChange={(e) => onChange(e)}
          placeholder="Enter age"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          name="age"
          onChange={(e) => onChange(e)}
          placeholder="Enter age"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          name="age"
          onChange={(e) => onChange(e)}
          placeholder="Enter age"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

EditUserProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getProfileById })(
  withRouter(EditUserProfile)
);
