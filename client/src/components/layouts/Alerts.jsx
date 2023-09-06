import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    const { msg, alertType } = alert;
    alertType === "success"
      ? toast.success(msg)
      : alertType === "info"
      ? toast.info(msg)
      : toast.error(msg);
  });

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alerts);
