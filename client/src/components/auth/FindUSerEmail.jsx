import React from "react";
import PropTypes from "prop-types";
import { generateToken } from "../../Actions/auth";
import { connect } from "react-redux";

const FindUSerEmail = ({ generateToken }) => {
  const [data, setData] = React.useState({
    email: "",
    error: null,
    success: null,
    loading: false,
  });

  const { email, error, success, loading } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: null,
      success: null,
      loading: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ loading: true });
    const res = await generateToken(data.email);
    console.log(res);
    setData({
      email: "",
      error: res.data.error ? res.data.error.msg : null,
      success: res.data.success ? res.data.success.msg : null,
      loading: false,
    });
  };

  return (
    <div>
      <div className="jumbotron">
        <h1 className="text-center display-4 text-primary">Reset Password</h1>
      </div>
      <div style={{ width: "75%", margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              className="form-control"
            />

            {error && <p className="text-danger mt-3 text-center">{error}</p>}
            {success && (
              <p className="text-success mt-3 text-center">{success}</p>
            )}
            {loading && (
              <p className="text-info mt-3 text-center">Loading...</p>
            )}
          </div>
          <button className="btn btn-primary btn-block mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
};

FindUSerEmail.propTypes = {
  generateToken: PropTypes.func.isRequired,
};

export default connect(null, { generateToken })(FindUSerEmail);
