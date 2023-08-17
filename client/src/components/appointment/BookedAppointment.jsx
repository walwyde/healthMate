import React, { Fragment, useEffect } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import Loading from "../layouts/Loading";
import {
  getBookedAppointments,
  deleteAppointment,
  approveAppointment,
} from "../../Actions/appointment";

const BookedAppointment = ({
  getBookedAppointments,
  deleteAppointment,
  approveAppointment,
  appointment: { appointments, loading },
  profile: { profile },
  auth,
}) => {
  useEffect(() => {
    getBookedAppointments();
  }, []);

  if (!loading && auth.user && auth.user.isStaff && !profile)
    return <Redirect to="/profile" />;

  if (loading && !appointments)
    return (
      <Fragment>
        <Loading />
      </Fragment>
    );

  if ((!loading && !appointments) || appointments.length === 0) {
    return (
      <Fragment>
        <h5 className="text-center text-primary lead text-muted">
          No Appointments Yet
        </h5>
      </Fragment>
    );
  }

  return (
    !loading && (
      <Fragment>
        {!loading && appointments.length > 0 && (
          <div>
            {appointments.map((appointment) => (
              <div className="card mb-3 bg-light" key={appointment._id}>
                <div className="card-body">
                  <p className="card-title">Status: {appointment.status}</p>
                  <p className="card-text">Time: {appointment.time}</p>
                  <p className="card-text">
                    <Moment format="MMMM Do YYYY">{appointment.date}</Moment>
                  </p>
                </div>
                <Link
                  to={`/appointments/${appointment._id}`}
                  className="btn btn-info btn-sm"
                >
                  View Appointment
                </Link>
                {auth.user && auth.user.isStaff && (
                  <div>
                    {appointment.status !== "approved" && (
                      <button
                        onClick={() => approveAppointment(appointment._id)}
                        className="btn btn-success btn-sm m-2 float-left"
                      >
                        Approve Appointment
                      </button>
                    )}
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
                      className="btn btn-danger btn-sm m-2 float-right"
                    >
                      Delete Appointment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  );
};

BookedAppointment.propTypes = {
  getBookedAppointments: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  approveAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appointment: state.appointment,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getBookedAppointments,
  deleteAppointment,
  approveAppointment,
})(withRouter(BookedAppointment));
