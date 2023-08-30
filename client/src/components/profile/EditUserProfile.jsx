import { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { editProfile } from "../../Actions/profile";
import { loadCurrentProfile } from "../../Actions/profile";
import { addAvailability, clearAvailability } from "../../Actions/appointment";
import { connect } from "react-redux";

const EditUserProfile = ({
  profile: { profile, loading },
  editProfile,
  history,
  loadCurrentProfile,
  addAvailability,
  clearAvailability,
  auth: { user, loading: authloading },
}) => {
  // init user state
  const diabetic = !authloading && user.condition.diabetic;
  const hypertensive = !authloading && user.condition.hypertensive;

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
    date: new Date().toISOString().split("T")[0], // Default to current date
    day: "",
    time: "",
  });

  // hpyertensive form constants
  const {
    day,
    time,
    date,
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
    loadCurrentProfile();
    setFormData({
      name: loading || !profile ? "" : profile.name,
      age: loading || !profile ? "" : profile.age,
      gender: loading || !profile ? "" : profile.gender,
      address: loading || !profile ? "" : profile.address,
      phone: loading || !profile ? "" : profile.phone,
      systolic: loading || !profile ? "" : profile.systolic,
      diastolic: loading || !profile ? "" : profile.diastolic,
      medName: loading || !profile ? "" : profile.medName,
      medDose: loading || !profile ? "" : profile.medDose,
      frequency: loading || !profile ? "" : profile.frequency,
      otherHealthConditions:
        loading || !profile ? "" : profile.otherHealthConditions,
      allergies: loading || !profile ? "" : profile.allergies,
      emergencyContact: loading || !profile ? "" : profile.emergencyContact,
      familyHistory: loading || !profile ? "" : profile.profileHistory,

      // staff from state

      title: loading || !profile ? "" : profile.title,
      professionalDesignation:
        loading || !profile ? "" : profile.professionalDesignation,
      licenceType: loading || !profile ? "" : profile.licenceType,
      licenceNum: loading || !profile ? "" : profile.licenceNum,
      expiryDate: loading || !profile ? "" : profile.expiryDate,
      nin: loading || !profile ? "" : profile.nin,
    });
  }, [loadCurrentProfile, loading, authloading]);

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

  // staff form functions

  const onSubmitAvailability = (e) => {
    const { date, day, time } = formData;
    const availability = {
      date: date,
      day: day,
      time: time,
    };
    e.preventDefault();
    addAvailability(availability);

    setFormData({
      ...formData,
      date: "",
      day: "",
      time: "",
    });
  };

  const handleClearAvailability = () => {
    clearAvailability();
  };

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : !authloading && hypertensive && !loading ? (
    <Fragment>
      <Link to="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
      <h1 className="heading text-center text-primary">
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

        <Button className="mb-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  ) : // Render the form for diabetic patients

  !authloading && diabetic && !loading ? (
    <Fragment>
      <Link to="/profile" className="btn btn-primary m-2">
        Back to Profile
      </Link>
      <h1 className="large text-primary">
        <fa-fas-user></fa-fas-user> Edit Profile
      </h1>

      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="phone">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="name"
            value={name}
            placeholder="Enter full name"
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Age</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="age"
            value={age}
            placeholder="Enter your age"
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Address</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            name="address"
            value={address}
            placeholder="Enter Contact Address"
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            className="mb-3"
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
            className="mb-3"
            type="date"
            name="diagnosisDate"
            value={formData.diagnosisDate}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="typeOfDiabetes">
          <Form.Label>Type of Diabetes</Form.Label>
          <Form.Control
            className="mb-3"
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
            className="mb-3"
            type="text"
            name="medName"
            value={medName}
            placeholder="Enter medication name(s) seperated by commas(,)"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            className="mb-3"
            type="text"
            name="medDose"
            placeholder="Enter medication dose(s) seperated by commas(,)"
            value={medDose}
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            className="mb-3"
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
            className="mb-3"
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
            className="mb-3"
            type="text"
            name="contactPhone"
            placeholder="Enter emergency contact"
            value={formData.contactPhone}
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            className="mb-3"
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
            className="mb-3"
            type="date"
            name="readingDate"
            value={formData.readingDate}
            placeholder="Enter reading Date"
            onChange={(e) => onChange(e)}
          />

          <Form.Control
            className="mb-3"
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
            className="mb-3"
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
            className="mb-3"
            type="text"
            name="docName"
            value={formData.docName}
            placeholder="Enter your doctor's name"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            className="mb-3"
            type="text"
            name="docPhone"
            value={formData.docPhone}
            placeholder="Enter your doctor's phone no_"
            onChange={(e) => onChange(e)}
          />
          <Form.Control
            className="mb-3"
            type="email"
            name="docEmail"
            value={formData.docEmail}
            placeholder="Enter your doctor's email"
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Button className="mb-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  ) : !authloading && user.isStaff && !loading ? (
    <Fragment>
      <Link to="/profile" className="btn btn-primary m-2">
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

        <Form.Text className="text-muted mb-3 text-center  ">
          Add Availability
        </Form.Text>
        <Form.Group controlId="day" className="mb-3">
          <Form.Label>Day:</Form.Label>
          <Form.Select name="day" onChange={(e) => onChange(e)} value={day}>
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="time">
          <Form.Label>Time:</Form.Label>
          <Form.Select name="time" onChange={(e) => onChange(e)} value={time}>
            <option value="">Select a time</option>
            <option value="Morning">9 AM</option>
            <option value="Afternoon">12 PM</option>
            <option value="Evening">4 PM</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Button
            variant="primary"
            onClick={(e) => onSubmitAvailability(e)}
            className="mt-3"
          >
            Add Availability
          </Button>
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Button
            variant="primary"
            onClick={(e) => handleClearAvailability(e)}
            className="mt-3"
          >
            clear Availability
          </Button>
        </Form.Group>

        <Button className="btn btn-primary mb-4" type="submit">
          Submit
        </Button>
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
  loadCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addAvailability: PropTypes.func.isRequired,
  clearAvailability: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  editProfile,
  loadCurrentProfile,
  addAvailability,
  clearAvailability,
})(withRouter(EditUserProfile));
