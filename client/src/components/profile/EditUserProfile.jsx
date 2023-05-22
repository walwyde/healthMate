import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { getProfileById, editProfile } from "../../Actions/profile";
import { connect } from "react-redux";

const EditUserProfile = ({
  profile: { profile, loading },
  editProfile,
  history,
  getProfileById,
  match,
  auth: {user}
}) => {
  useEffect(() => {
    getProfileById(match.params._id);
  }, [loading]);

  const [formData, setFormData] = useState({
    name: profile && !loading && profile.name ? profile.name : "",
    age: profile && !loading && profile.age ? profile.age : "",
    gender: profile && !loading && profile.gender ? profile.gender : "",
    address: profile && !loading && profile.address ? profile.address : "",
    phone: profile && !loading && profile.phone ? profile.phone : "",
    systolic: profile && !loading && profile.systolic ? profile.systolic : "",
    diastolic:
      profile && !loading && profile.diastolic ? profile.diastolic : "",
    medName: profile && !loading && profile.medName ? profile.medName : "",
    medDose: profile && !loading && profile.medDose ? profile.medDose : "",
    frequency:
      profile && !loading && profile.frequency ? profile.frequency : "",
    otherHealthConditions:
      profile && !loading && profile.otherHealthConditions
        ? profile.otherHealthConditions
        : "",
    allergies:
      profile && !loading && profile.allergies ? profile.allergies : "",
    emergencyContact:
      profile && !loading && profile.emergencyContact
        ? profile.emergencyContact
        : "",
    familyHistory:
      profile && !loading && profile.profileHistory
        ? profile.profileHistory
        : "",
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
    console.log(formData);
    e.preventDefault();
    editProfile(formData, history);
  };

  // class diabeticFunctions {

  //   constructor(props) {
  // const [formData, setFormData] = useState({
  //     phone: '',
  //     diagnosisDate: '',
  //     typeOfDiabetes: '',
  //     medications: [{ name: '', dose: '', frequency: '' }],
  //     allergies: [{ name: '' }],
  //     emergencyContact: { name: '', phone: '' },
  //     glucoseReadings: [{ date: '', time: '', glucoseLevel: '' }],
  //     insulinDose: [{ insulinType: '' }],
  //     doctor: { name: '', phone: '', email: '' },
  //   });
  
  //   const handleChange = (e, index, nestedField) => {
  //     if (nestedField) {
  //       const updatedData = { ...formData };
  //       updatedData[nestedField][index][e.target.name] = e.target.value;
  //       setFormData(updatedData);
  //     } else {
  //       setFormData({ ...formData, [e.target.name]: e.target.value });
  //     }
  //   };
  
  //   const handleAddItem = (field) => {
  //     setFormData((prevState) => ({
  //       ...formData,
  //       [field]: [...prevState[field], {}],
  //     }));
  //   };
  
  //   const handleRemoveItem = (index, field, nestedField) => {
  //     const updatedData = { ...formData };
  //     if (nestedField) {
  //       updatedData[field].splice(index, 1);
  //     } else {
  //       updatedData[field] = updatedData[field].filter((_, i) => i !== index);
  //     }
  //     setFormData(updatedData);
  //   };
  
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Handle form submission logic
  //     console.log(formData);
  //   };
  // }
  // }

  const diabetic = user && user.condition.diabetic;
  const hypertensive = user && user.condition.hypertensive;

  if (hypertensive) return (
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
        <Form.Text>Enter last three readings SEPERATED BY COMMAS(,)</Form.Text>
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
  if (diabetic) return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="phone">
      <Form.Label>Phone</Form.Label>
      <Form.Control
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="diagnosisDate">
      <Form.Label>Diagnosis Date</Form.Label>
      <Form.Control
        type="date"
        name="diagnosisDate"
        value={formData.diagnosisDate}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="typeOfDiabetes">
      <Form.Label>Type of Diabetes</Form.Label>
      <Form.Control
        type="text"
        name="typeOfDiabetes"
        value={formData.typeOfDiabetes}
        onChange={handleChange}
      />
    </Form.Group>

    {/* Medications */}
    <Form.Group controlId="medications">
      <Form.Label>Medications</Form.Label>
      {formData.medications.map((medication, index) => (
        <div key={index}>
          <Form.Control
            type="text"
            name="name"
            value={medication.name}
            onChange={(e) => handleChange(e, index, 'medications')}
          />
          <Form.Control
            type="text"
            name="dose"
            value={medication.dose}
            onChange={(e) => handleChange(e, index, 'medications')}
          />
          <Form.Control
            type="text"
            name="frequency"
            value={medication.frequency}
            onChange={(e) => handleChange(e, index, 'medications')}
          />
          {index > 0 && (
            <Button variant="danger" onClick={() => handleRemoveItem(index, 'medications')}>
              Remove
            </Button>
          )}
        </div>
            ))}
            <Button variant="primary" onClick={() => handleAddItem('medications')}>
              Add Medication
            </Button>
          </Form.Group>
        
          {/* Allergies */}
          <Form.Group controlId="allergies">
            <Form.Label>Allergies</Form.Label>
            {formData.allergies.map((allergy, index) => (
              <div key={index}>
                <Form.Control
                  type="text"
                  name="name"
                  value={allergy.name}
                  onChange={(e) => handleChange(e, index, 'allergies')}
                />
                {index > 0 && (
                  <Button variant="danger" onClick={() => handleRemoveItem(index, 'allergies')}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="primary" onClick={() => handleAddItem('allergies')}>
              Add Allergy
            </Button>
          </Form.Group>
        
          {/* Emergency Contact */}
          <Form.Group controlId="emergencyContact">
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.emergencyContact.name}
              onChange={(e) => handleChange(e, null, 'emergencyContact')}
            />
            <Form.Control
              type="text"
              name="phone"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleChange(e, null, 'emergencyContact')}
            />
          </Form.Group>
        
          {/* Glucose Readings */}
          <Form.Group controlId="glucoseReadings">
            <Form.Label>Glucose Readings</Form.Label>
            {formData.glucoseReadings.map((reading, index) => (
              <div key={index}>
                <Form.Control
                  type="text"
                  name="date"
                  value={reading.date}
                  onChange={(e) => handleChange(e, index, 'glucoseReadings')}
                />
                <Form.Control
                  type="text"
                  name="time"
                  value={reading.time}
                  onChange={(e) => handleChange(e, index, 'glucoseReadings')}
                />
                <Form.Control
                  type="text"
                  name="glucoseLevel"
                  value={reading.glucoseLevel}
                  onChange={(e) => handleChange(e, index, 'glucoseReadings')}
                />
                {index > 0 && (
                  <Button variant="danger" onClick={() => handleRemoveItem(index, 'glucoseReadings')}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="primary" onClick={() => handleAddItem('glucoseReadings')}>
              Add Glucose Reading
            </Button>
          </Form.Group>
        
          {/* Insulin Dose */}
          <Form.Group controlId="insulinDose">
            <Form.Label>Insulin Dose</Form.Label>
            {formData.insulinDose.map((dose, index) => (
              <div key={index}>
                <Form.Control
                  type="text"
                  name="insulinType"
                  value={dose.insulinType}
                  onChange={(e) => handleChange(e, index, 'insulinDose')}
                />
                {index > 0 && (
                  <Button variant="danger" onClick={() => handleRemoveItem(index, 'insulinDose')}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="primary" onClick={() => handleAddItem('insulinDose')}>
              Add Insulin Dose
            </Button>
          </Form.Group>
        
          {/* Doctor */}
          <Form.Group controlId="doctor">
            <Form.Label>Doctor</Form.Label>
        <Form.Control
    type="text"
    name="name"
    value={formData.doctor.name}
    onChange={(e) => handleChange(e, null, 'doctor')}
  />
  <Form.Control
    type="text"
    name="phone"
    value={formData.doctor.phone}
    onChange={(e) => handleChange(e, null, 'doctor')}
  />
  <Form.Control
    type="email"
    name="email"
    value={formData.doctor.email}
    onChange={(e) => handleChange(e, null, 'doctor')}
  />
</Form.Group>

<Button variant="primary" type="submit">
  Submit
</Button>
</Form>
  )
  if (diabetic === false && hypertensive === false) {
    return <Redirect to="/profile" />
  }
};

EditUserProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { editProfile, getProfileById })(
  withRouter(EditUserProfile)
);
