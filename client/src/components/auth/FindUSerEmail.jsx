import React from "react";
import PropTypes from "prop-types";
import { resetPassword } from "../../Actions/auth";
import { connect } from "react-redux";

const FindUSerEmail = ({ resetPassword }) => {
  const [data, setData] = React.useState({
    email: "",
    error: null,
    success: null,
    loading: false,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: null,
      success: null,
      loading: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(data.email);
    console.log(res);
    setData({
      email: "",
      error: res.error,
      success: res.success,
      loading: true,
    });
  };

  const { email, error, success, loading } = data;
  return (
    <div>
      <div className="jumbotron">
        <h1 className="text-center display-4 text-primary">Reset Password</h1>

        <form onSubmit={handleSubmit} className="form-group">
          <label>Enter your email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            className="form-control"
          ></input>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
          {success && (
            <p className="text-success mt-3 text-center">{success}</p>
          )}
          {loading && <p className="text-info mt-3 text-center">Loading...</p>}
          <button className="btn btn-primary btn-block mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
};

FindUSerEmail.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(FindUSerEmail);
