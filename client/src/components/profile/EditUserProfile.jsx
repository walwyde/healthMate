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
    name: !loading && profile.name ? profile.name : "",
    age: !loading && profile.age ? profile.age : "",
    gender: !loading && profile.gender ? profile.gender : "",
    address: !loading && profile.address ? profile.address : "",
    phone: !loading && profile.phone ? profile.phone : "",
    systolic: !loading && profile.systolic ? profile.systolic : "",
    diastolic: !loading && profile.diastolic ? profile.diastolic : "",
    medName: !loading && profile.medName ? profile.medName : "",
    medDose: !loading && profile.medDose ? profile.medDose : "",
    frequency: !loading && profile.frequency ? profile.frequency : "",
    otherHealthConditions:
      !loading && profile.otherHealthConditions
        ? profile.otherHealthConditions
        : "",
    allergies: !loading && profile.allergies ? profile.allergies : "",
    emergencyContact:
      !loading && profile.emergencyContact
        ? profile.emergencyContact
        : "",
    familyHistory:
      !loading && profile.profileHistory ? profile.profileHistory : "",
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
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          name="address"
          onChange={(e) => onChange(e)}
          placeholder="Enter Address"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Diastolic</Form.Label>
        <Form.Control
          type="text"
          value={diastolic}
          name="diastolic"
          onChange={(e) => onChange(e)}
          placeholder="Enter Diastolic Reading"
          required
        />
        <Form.Text>
          Enter last three readings SEPERATED BY COMMAS(,)
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Systolic</Form.Label>
        <Form.Control
          type="text"
          value={systolic}
          name="systolic"
          onChange={(e) => onChange(e)}
          placeholder="Enter Systolic readings"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Medication Name</Form.Label>
        <Form.Control
          type="text"
          value={medName}
          name="medName"
          onChange={(e) => onChange(e)}
          placeholder="Enter medication Name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Medication Dose</Form.Label>
        <Form.Control
          type="text"
          value={medDose}
          name="medDose"
          onChange={(e) => onChange(e)}
          placeholder="Enter enter medication dosage"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Medication Frequency</Form.Label>
        <Form.Control
          type="text"
          value={frequency}
          name="frequency"
          onChange={(e) => onChange(e)}
          placeholder="Enter frequency"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Other Health Conditions?</Form.Label>
        <Form.Control
          type="text"
          value={otherHealthConditions}
          name="otherHealthConditions"
          onChange={(e) => onChange(e)}
          placeholder="Enter other Health Conditions"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Allergies</Form.Label>
        <Form.Control
          type="text"
          value={allergies}
          name="allergies"
          onChange={(e) => onChange(e)}
          placeholder="Enter allergies"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Emergency Contact</Form.Label>
        <Form.Control
          type="text"
          value={emergencyContact}
          name="emergencyContact"
          onChange={(e) => onChange(e)}
          placeholder="Enter emergency Contact"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Family History</Form.Label>
        <Form.Control
          type="text"
          value={familyHistory}
          name="familyHistory"
          onChange={(e) => onChange(e)}
          placeholder="Enter family History"
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
