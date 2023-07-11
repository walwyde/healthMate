import Reac, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { createProfile } from "../../Actions/profile";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

function CreateProfile({
  createProfile,
  history,
  match,
  profile: { profile },
  auth: { user, loading },
}) {
  // init user state
  const diabetic = user && user.condition.diabetic;
  const hypertensive = user && user.condition.hypertensive;
  const isStaff = user && user.isStaff;
  const isAdmin = user && user.isAdmin;

  // hypertensive form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    systolic: "",
    diastolic: "",
    medName: "",
    medDose: "",
    frequency: "",
    otherHealthConditions: "",
    allergies: "",
    contactName: "",
    contactPhone: "",
    familyHistory: "",

    // diabetic form state
    diagnosisDate: "",
    typeOfDiabetes: "",
    glucoseLevel: "",
    docName: "",
    docPhone: "",
    docEmail: "",
    readingDate: "",
    insulinType: "",

    // health staff from state

    email: "",
    dob: "",
    nin: "",
    licenceType: "",
    professionalDesignation: "",
    expiryDate: "",
    title: "",
    licenceNum: "",
  });

  // hpyertensive form constants
  const {
    email,
    dob,
    nin,
    licenceNum,
    licenceType,
    professionalDesignation,
    expiryDate,
    title,

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

  // Helper functions

  // hypertensive form functions

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history);

  };
  if (!loading && profile) return <Redirect to="/profile" />;

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : !isAdmin && !isStaff && !diabetic && !hypertensive ? (
    <Redirect to="/profile" />
  ) : !loading && hypertensive ? (
    <Fragment>
      <h1 className="large text-primary">Create Profile</h1>
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
          <Form.Text>Enter multiple readings SEPERATED BY COMMAS(,)</Form.Text>
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
          <Form.Text>Enter multiple readings SEPERATED BY COMMAS(,)</Form.Text>
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
          <Form.Text>Enter multiple readings SEPERATED BY COMMAS(,)</Form.Text>
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
          <Form.Text>
            Of the names mentioned above SEPERATED BY COMMAS(',')
          </Form.Text>
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
          <Form.Text>
            Of the names mentioned above SEPERATED BY COMMAS(',')
          </Form.Text>
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

         {/* Doctor */}
         <Form.Group controlId="doctor" className="mb-3">
          <Form.Label>Doctor</Form.Label>
          <Form.Control
            type="text"
            name="docName"
            value={formData.docName}
            placeholder="Enter your doctor's name"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="text"
            name="docPhone"
            value={formData.docPhone}
            placeholder="Enter your doctor's phone no_"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="email"
            name="docEmail"
            value={formData.docEmail}
            placeholder="Enter your doctor's email"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Link to="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
    </Fragment>
  ) : // {/* Render the form for diabetic patients */}

  !loading && diabetic ? (
    <Fragment>
      <h1 className="large text-primary">Create Profile</h1>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            name="name"
            onChange={(e) => onChange(e)}
            placeholder="Enter full names"
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

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={phone}
            placeholder="Enter Contact Phone"
            onChange={(e) => onChange(e)}
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

        <Form.Group controlId="diagnosisDate" className="mb-3">
          <Form.Label>Diagnosis Date</Form.Label>
          <Form.Control
            type="date"
            name="diagnosisDate"
            value={formData.diagnosisDate}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="typeOfDiabetes" className="mb-3">
          <Form.Label>Type of Diabetes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Diabetes A, B or C "
            name="typeOfDiabetes"
            value={formData.typeOfDiabetes}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* Medications */}
        <Form.Group controlId="medications" className="mb-3">
          <Form.Label>Medications</Form.Label>

          <Form.Control
            type="text"
            name="medName"
            value={medName}
            placeholder="Enter medication name(s) seperated by commas(,)"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="text"
            name="medDose"
            placeholder="Enter medication dose(s) seperated by commas(,)"
            value={medDose}
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="text"
            name="frequency"
            placeholder="Enter medication frequency(s) seperated by commas(,)"
            value={frequency}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* Allergies */}
        <Form.Group controlId="allergies" className="mb-3">
          <Form.Label>Allergies</Form.Label>

          <Form.Control
            type="text"
            name="allergies"
            value={allergies}
            placeholder="Enter allergy(s) seperated by commas(,)"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* Emergency Contact */}
        <Form.Group controlId="emergencyContact" className="mb-3">
          <Form.Label>Emergency Contact</Form.Label>
          <Form.Control
            type="text"
            name="contactPhone"
            placeholder="Enter emergency contact"
            value={formData.contactPhone}
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="text"
            name="contactName"
            value={formData.contactName}
            placeholder="Enter emergency contact name"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* Glucose Readings */}
        <Form.Group controlId="glucoseReadings" className="mb-3">
          <Form.Label>Glucose Readings</Form.Label>

          <Form.Control
            type="date"
            name="readingDate"
            value={formData.readingDate}
            placeholder="Enter reading Date"
            onChange={(e) => onChange(e)}
          />

          <Form.Control
            type="text"
            name="glucoseLevel"
            value={formData.glucoseLevel}
            placeholder="Enter glucose reading level"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* Insulin Dose */}
        <Form.Group controlId="insulinDose" className="mb-3">
          <Form.Label>Insulin Dose</Form.Label>
          <Form.Control
            type="text"
            name="insulinType"
            value={formData.insulinType}
            placeholder="Enter insulin type"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* Doctor */}
        <Form.Group controlId="doctor" className="mb-3">
          <Form.Label>Doctor</Form.Label>
          <Form.Control
            type="text"
            name="docName"
            value={formData.docName}
            placeholder="Enter your doctor's name"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="text"
            name="docPhone"
            value={formData.docPhone}
            placeholder="Enter your doctor's phone no_"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            type="email"
            name="docEmail"
            value={formData.docEmail}
            placeholder="Enter your doctor's email"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Link to="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
    </Fragment>
  ) : (
    !loading &&
    isStaff && (
      <Fragment>
        <h1 className="large text-primary">Create Profile</h1>

        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="title"
              onChange={(e) => onChange(e)}
              placeholder="Dr, Prof, Other"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender}
              name="gender"
              onChange={(e) => onChange(e)}
              placeholder="Dr, Prof, Other"
              required
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="others">Others</option>
            </Form.Select>
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
            <Form.Label>Contact Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              name="address"
              onChange={(e) => onChange(e)}
              placeholder="Enter office address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contact Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              name="phone"
              onChange={(e) => onChange(e)}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contact Email </Form.Label>
            <Form.Control
              type="text"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
              placeholder="Enter your contact email address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>NIN Number</Form.Label>
            <Form.Control
              type="text"
              value={nin}
              name="nin"
              onChange={(e) => onChange(e)}
              placeholder="Enter your identification number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>professional Designation</Form.Label>
            <Form.Control
              type="text"
              value={professionalDesignation}
              name="professionalDesignation"
              onChange={(e) => onChange(e)}
              placeholder="Enter your area of specialty"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Medical Licence Type</Form.Label>
            <Form.Control
              type="text"
              value={licenceType}
              name="licenceType"
              onChange={(e) => onChange(e)}
              placeholder="Medical, Pharmaceutical, Other"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Medical Licence Number</Form.Label>
            <Form.Control
              type="text"
              value={licenceNum}
              name="licenceNum"
              onChange={(e) => onChange(e)}
              placeholder="Enter licence number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Medical Licence Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={expiryDate}
              name="expiryDate"
              onChange={(e) => onChange(e)}
              placeholder="Enter licence expiry date"
              required
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>

        <Link to="/profile" className="btn btn-primary m-2">
          Back to Profile
        </Link>
      </Fragment>
    )
  );
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
