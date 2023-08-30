import React from "react";
import PropTypes from "prop-types";
import { resetPassword } from "../../Actions/auth";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ResetPassword = ({ resetPassword, match }) => {
  const [data, setData] = React.useState({
    newPassword: "",
    confirmNewPassword: "",
    showPassword: false,
    error: [],
    success: null,
  });

  const { newPassword, confirmNewPassword, showPassword, error, success } =
    data;
  const token = match.params.token;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: [],
      success: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword({ ...data, token });
    await setData({
      ...data,
      error: res.data.errors ? res.data.errors : [],
      success: res.data.success ? res.data.success : null,
    });
  };

  return (
    <div>
      <div className="jumbotron text-center text-primary">
        <h1>Reset Password</h1>
        {error && (
          <div>
            {error.map((e) => (
              <p className="text-danger"> {e.msg}</p>
            ))}
            {error.map(
              (e) =>
                e.msg.includes("from begining") && (
                  <Link
                    className="btn btn-sm btn-secondary"
                    to="/reset-password"
                  >
                    Restart
                  </Link>
                )
            )}
          </div>
        )}
        {success && (
          <div>
        <p className="text-success lead">{success.msg}</p>
        <Link to='/login' className="btn btn-sm btn-success">Login to your account</Link>
        </div>
      )}
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-3">
          <label htmlFor="newPassword"> Enter new password</label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            name="newPassword"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmNewPassword"> Confirm new password</label>
          <input
            id="confirmNewPassword"
            onChange={(e) => handleChange(e)}
            type={showPassword ? "text" : "password"}
            name="confirmNewPassword"
            value={confirmNewPassword}
            className="form-control"
          />
        </div>
        <div class="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={showPassword}
            onChange={() => {
              setData({ showPassword: !showPassword });
            }}
          />
          <label class="form-check-label mb-3" for="flexSwitchCheckChecked">
            Show password
          </label>
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          Submit
        </button>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
