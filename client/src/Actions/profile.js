import axios from 'axios'
import {load_profile, profile_error, clear_profile, log_out} from './types'


export const createProfile =
  (formData, history, userType = user) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    try {
      const res =
        userType === "staff"
          ? await axios.post("/api/workers", formData, config)
          : await axios.post("http://localhost:5005/api/users", formData, config);

      if (res.errors)
        return res.errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger"))
        );

      if (res) history.push("/profile");

      dispatch({
        type: load_success,
        payload: { token: res },
      });

      dispatch(loadUser());

      dispatch(setAlert("Registration Successful", "success"));
    } catch (err) {
      console.log(err);

      dispatch({
        type: profile_error,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: clear_profile,
  });
  dispatch({
    type: log_out,
  });
};
