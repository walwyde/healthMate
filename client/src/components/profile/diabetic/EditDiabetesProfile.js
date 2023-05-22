import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditDiabetesProfile = () => {
  const [formData, setFormData] = useState({
    phone: '',
    diagnosisDate: '',
    typeOfDiabetes: '',
    medications: [{ name: '', dose: '', frequency: '' }],
    allergies: [{ name: '' }],
    emergencyContact: { name: '', phone: '' },
    glucoseReadings: [{ date: '', time: '', glucoseLevel: '' }],
    insulinDose: [{ insulinType: '' }],
    doctor: { name: '', phone: '', email: '' },
  });

  const handleChange = (e, index, nestedField) => {
    if (nestedField) {
      const updatedData = { ...formData };
      updatedData[nestedField][index][e.target.name] = e.target.value;
      setFormData(updatedData);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = (field) => {
    setFormData((prevState) => ({
      ...formData,
      [field]: [...prevState[field], {}],
    }));
  };

  const handleRemoveItem = (index, field, nestedField) => {
    const updatedData = { ...formData };
    if (nestedField) {
      updatedData[field].splice(index, 1);
    } else {
      updatedData[field] = updatedData[field].filter((_, i) => i !== index);
    }
    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
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
  )};

export default EditDiabetesProfile;
          
       
