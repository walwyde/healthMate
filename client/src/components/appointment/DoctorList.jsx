import React, { useState, Fragment } from 'react';
import { Container, Card, ListGroup, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newAppointment } from '../../Actions/appointment';

const DoctorList = ({ doctors, newAppointment, loading }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [date , setDate] = useState('');

  const handleAppointmentBooking = () => {
    if (selectedDoctor && selectedTimeSlot) {
      // Implement your logic to handle appointment booking here
      console.log(`Appointment booked for ${selectedDoctor.name} at ${selectedTimeSlot} on ${date}`);
      newAppointment(selectedDoctor._id, selectedTimeSlot, date);
    }
  };

  console.log(doctors);

  return (
    
    <Container>
      {!loading && doctors.map((doctor, index) => (
        <Card key={index} className="mb-3">
          <Card.Header>Doctor: {doctor.title} {doctor.user.name}</Card.Header>
          <Card.Body>
            <Card.Title>Available Time Slots:</Card.Title>
            <ListGroup>
              {doctor.availability.map((slot, slotIndex) => (
                <ListGroup.Item
                  key={slotIndex}
                  onClick={() => setSelectedTimeSlot(slot)}
                  active={selectedTimeSlot === slot}
                  style={{ cursor: 'pointer' }}
                >
                  {slot}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Card.Title>Propose Date:</Card.Title>
            <ListGroup>
              <Form.Control
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                onClick={() => setDate(date)}
                style={{ cursor: 'pointer' }}
                value={date}
              />

              </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="primary"
              onClick={() => setSelectedDoctor(doctor)}
              disabled={!selectedTimeSlot}
            >
              Select Doctor
            </Button>{' '}
            {selectedDoctor && (
              <Button variant="success" onClick={handleAppointmentBooking}>
                Book Appointment
              </Button>
            )}
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

DoctorList.propTypes = {
  newAppointment: PropTypes.func.isRequired,
  doctors: PropTypes.array.isRequired,
};



export default connect(null, {newAppointment})(DoctorList);
