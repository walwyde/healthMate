import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAppointment } from "../../Actions/appointment";
import Moment from "react-moment";

const Appointment = ({
  getAppointment,
  appointment: { appointment, loading },
  match,
}) => {
  useEffect(() => {
    getAppointment(match.params.id);
  }, []);

  return !loading && appointment && appointment.user && appointment.doctor ? (
    <Fragment>
      <div className="jumbotron text-center">
        <h3 className="lead text-primary">Appointment Details</h3>
      </div>
      <div className="card mb-5">
        <div className="card-body">
          <h3 className="card-title text-center">
            Appointment With{" "}
            <Link
              className="text-info"
              to={`/profile/${appointment.doctor._id}`}
            >
              {appointment.doctor.title} {appointment.doctor.name}
            </Link>
          </h3>
          <p className="card-text">
            <span>Client:</span>{" "}
            <Link
              className="card p-1 text-info m-3 lead"
              to={`/profile/${appointment.user._id}`}
            >
              {appointment.user.name}
            </Link>
          </p>
          <p
            className={
              appointment.status === "pending"
                ? "text-muted card-title"
                : "card-title"
            }
          >
            Status: {appointment.status}
          </p>
          <p
            className={
              appointment.status === "pending"
                ? "text-muted card-title"
                : "card-title"
            }
          >
            Time: {appointment.time}
          </p>
          <p
            className={
              appointment.status === "pending"
                ? "text-muted card-title"
                : "card-title"
            }
          >
            Date: <Moment fromNow>{appointment.date}</Moment>
          </p>
          <p
            className={
              appointment.status === "pending"
                ? "text-muted card-title"
                : "card-title"
            }
          >
            Doctor's Contact: {appointment.doctor.contactDetails.phone}
          </p>
          <p
            className={
              appointment.status === "pending"
                ? "text-muted card-title"
                : "card-title"
            }
          >
            Doctor's Address: {appointment.doctor.contactDetails.address}
          </p>
        </div>

        <Link to="/appointments" className="card-link btn btn-primary btn-sm">
          {" "}
          Go Back{" "}
        </Link>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="jumbotron text-center">
        <h3 className="lead text-primary">Cannot Hold</h3>
        <p className="lead">One or more participants absent from site...</p>
      </div>
    </Fragment>
  );
};

Appointment.propTypes = {
  getAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointment })(Appointment);
