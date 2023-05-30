import { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Link from "react-bootstrap/NavLink";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { editProfile } from "../../Actions/profile";
import { getProfileById } from "../../Actions/profile";
import { connect } from "react-redux";

const EditUserProfile = ({
  profile: { profile, loading },
  editProfile,
  history,
  getProfileById,
  match,
  auth: { user },
}) => {
  // init user state
  const diabetic = user && user.condition.diabetic;
  const hypertensive = user && user.condition.hypertensive;

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

    // Staff form state

    title: "",
    licenceNum: "",
    licenceType: "",
    expiryDate: "",
    email: "",
    nin: "",
    professionalDesignation: "",
  });

  // Handle Image Upload
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // hpyertensive form constants
  const {
    expiryDate,
    professionalDesignation,
    nin,
    email,
    title,
    licenceNum,
    licenceType,
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

  useEffect(() => {
    getProfileById(match.params._id);
    setFormData({
      name: loading || !profile.name ? "" : profile.name,
      age: loading || !profile.age ? "" : profile.age,
      gender: loading || !profile.gender ? "" : profile.gender,
      address: loading || !profile.address ? "" : profile.address,
      phone: loading || !profile.phone ? "" : profile.phone,
      systolic: loading || !profile.systolic ? "" : profile.systolic,
      diastolic: loading || !profile.diastolic ? "" : profile.diastolic,
      medName: loading || !profile.medName ? "" : profile.medName,
      medDose: loading || !profile.medDose ? "" : profile.medDose,
      frequency: loading || !profile.frequency ? "" : profile.frequency,
      otherHealthConditions:
        loading || !profile.otherHealthConditions
          ? ""
          : profile.otherHealthConditions,
      allergies: loading || !profile.allergies ? "" : profile.allergies,
      emergencyContact:
        loading || !profile.emergencyContact ? "" : profile.emergencyContact,
      familyHistory:
        loading || !profile.profileHistory ? "" : profile.profileHistory,

      // staff from state

      title: loading || !profile.title ? "" : profile.title,
      professionalDesignation:
        loading || !profile.professionalDesignation
          ? ""
          : profile.professionalDesignation,
      licenceType: loading || !profile.licenceType ? "" : profile.licenceType,
      licenceNum: loading || !profile.licenceNum ? "" : profile.licenceNum,
      expiryDate: loading || !profile.expiryDate ? "" : profile.expiryDate,
      nin: loading || !profile.nin ? "" : profile.nin,
    });
  }, [loading]);

  // Helper functions

  // hypertensive form functions

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(
      formData,
      history,
      user.condition.diabetic ? "diabetic" : "hypertensive"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : !loading && hypertensive ? (
    <Fragment>
      <Link href="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
      <h1 className="large text-primary">
        <fa-fas-user></fa-fas-user> Edit Profile
      </h1>

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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            value={selectedFile}
            name="avatar"
            onChange={(e) => onChange(e)}
            placeholder="Enter family History"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  ) : // Render the form for diabetic patients

  !loading && profile && diabetic ? (
    <Fragment>
      <Link href="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
      <h1 className="large text-primary">
        <fa-fas-user></fa-fas-user> Edit Profile
      </h1>

      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="phone">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Enter Contact Phone"
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={age}
            placeholder="Enter Contact Phone"
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            placeholder="Enter Contact Phone"
            onChange={(e) => onChange(e)}
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

        <Form.Group controlId="diagnosisDate">
          <Form.Label>Diagnosis Date</Form.Label>
          <Form.Control
            type="date"
            name="diagnosisDate"
            value={formData.diagnosisDate}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="typeOfDiabetes">
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
        <Form.Group controlId="medications">
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
        <Form.Group controlId="allergies">
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
        <Form.Group controlId="emergencyContact">
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
        <Form.Group controlId="glucoseReadings">
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
        <Form.Group controlId="insulinDose">
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
        <Form.Group controlId="doctor">
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
    </Fragment>
  ) : !loading && user && user.isStaff ? (
    <Fragment>
      <Link href="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
      <h1 className="large text-primary">
        <fa-fas-user></fa-fas-user> Edit Profile
      </h1>

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
    </Fragment>
  ) : (
    !diabetic &&
    !hypertensive &&
    user &&
    !user.isStaff && <Redirect to="/profile" />
  );
};

EditUserProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile, getProfileById })(
  withRouter(EditUserProfile)
);
