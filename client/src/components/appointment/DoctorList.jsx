import React, { useState, Fragment } from "react";
import { Card, ListGroup, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newAppointment } from "../../Actions/appointment";

const DoctorList = ({ doctors, newAppointment, loading }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [date, setDate] = useState({
    date: "",
  });

  const handleAppointmentBooking = () => {
    if (selectedDoctor && selectedTimeSlot) {
      // Implement your logic to handle appointment booking here
      console.log(
        `Appointment booked for ${selectedDoctor.user.name} at ${selectedTimeSlot} on ${date}`
      );
      newAppointment(selectedDoctor._id, selectedTimeSlot, date);
    }
  };

  return (
    <Fragment>
      {!loading &&
        doctors &&
        doctors.map((doctor) => (
          <Card key={doctor._id} className="mb-3">
            <Card.Header>
              <Link to={`profile/${doctor._id}`} className="text-primary">
                {" "}
                Doctor: {doctor.title} {doctor.user.name}
              </Link>
            </Card.Header>
            <Card.Body>
              <Card.Title>Available Time Slots:</Card.Title>
              <ListGroup>
                {doctor.availability.map((slot) => (
                  <ListGroup.Item
                    key={slot._id}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    active={selectedTimeSlot === slot.time}
                    style={{ cursor: "pointer" }}
                  >
                    <p> {slot.day}</p>
                    <p>{slot.time}</p>
                    <hr />
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card.Title>Propose Date:</Card.Title>
              <ListGroup>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                  style={{ cursor: "pointer" }}
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
              </Button>{" "}
              {selectedDoctor && (
                <Button
                  variant="success"
                  onClick={() => handleAppointmentBooking()}
                >
                  Book Appointment
                </Button>
              )}
            </Card.Footer>
          </Card>
        ))}
    </Fragment>
  );
};

DoctorList.propTypes = {
  newAppointment: PropTypes.func.isRequired,
  doctors: PropTypes.array.isRequired,
};

export default connect(null, { newAppointment })(DoctorList);
