import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import DoctorList from "./DoctorList";
import BookedAppointment from "./BookedAppointment";
import {
  getDoctors,
  getBookedAppointments,
  deleteAppointment,
} from "../../Actions/appointment";
import { Button } from "react-bootstrap";

const Appointments = ({
  getDoctors,
  appointment: { doctors, loading },
  auth,
  history
}) => {
  useEffect(() => {
    getDoctors();
  }, []);

  return auth.user && auth.user.isStaff ? (
    <Fragment>
      <div className="jumbotron">
        <h4 className="lead text-primary">Booked Appointments</h4>
      </div>
      <BookedAppointment />
    </Fragment>
  ) : (
    <Fragment>
      <div className="row">
        <div className="col-md-7">
          {!loading && doctors.length < 1 ? (
            <h1 className="heading text-primary my-5">No Doctors Available</h1>
          ) : (
            <div>
              <h1>Available Doctors</h1>
              <DoctorList doctors={doctors} loading={loading} />
            </div>
          )}

          <button onClick={() => history.push("/profile")} className="btn btn-primary btn-sm" >Back To Profile</button>
        </div>

        <div className="col-md-5">
          <div className="jumbotron text-center">
            <h4>Booked Appointments</h4>
          </div>
          <BookedAppointment />
        </div>
      </div>
    </Fragment>
  );
};

Appointments.propTypes = {
  getDoctors: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  getBookedAppointments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appointment: state.appointment,
});
export default connect(mapStateToProps, {
  getDoctors,
  getBookedAppointments,
  deleteAppointment,
})(withRouter(Appointments));
