import {
  login_fail,
  login_success,
  register_success,
  register_fail,
  log_out,
  clear_profile,
  clear_messages,
  init_convo_error,
} from "./types";

import { setAlert } from "../utils/setAlert";
import { loadUser } from "../Actions/register";
import axios from "axios";
import ResetPassword from "../components/auth/ResetPassword";

export const login = (formData, history) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  try {
    const res = await axios.post(
      "http://localhost:5005/api/auth",
      formData,
      options
    );

    if (res) history.replace("/profile");

    dispatch({
      type: login_success,
      payload: {
        token: res.data,
      },
    });
    dispatch(loadUser());
    dispatch(setAlert("You Have Been Logged In", "success"));
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;

    if (err.response.code === "ERR_NETWORK") {
      dispatch(setAlert(err.message, "danger"));
    }

    if (errors) {
      console.log(errors);
      errors.map((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: login_fail,
    });
  }
};
export const register = (formData, history) => async (dispatch) => {
  const { condition } = formData;

  const reFormed = { ...formData };

  if (condition === "hypertensive")
    reFormed.condition = { hypertensive: true, diabetic: false };
  if (condition === "diabetic")
    reFormed.condition = { hypertensive: false, diabetic: true };

  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:5005/api/users",
      reFormed,
      config
    );

    if (res) {
      history.replace("/profile");

      dispatch({
        type: register_success,
        payload: { token: res.data },
      });

      dispatch(loadUser());

      dispatch(setAlert("Registration Successful", "success"));
    }
  } catch (err) {
    console.log(err.response);
    if (err.response) dispatch(setAlert(err.response.statusText, "danger"));
    if (err.response.data.errors)
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );

    dispatch({
      type: register_fail,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: clear_profile,
  });
  dispatch({
    type: clear_messages,
  });
  dispatch({
    type: init_convo_error,
  });
  dispatch({
    type: log_out,
  });
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5005/api/auth/reset-password-token", {
      email,
    });

    if(res.data) return {success: res.data}
  } catch (err) {
    console.log(err.response);
    return {error: err.response.data};
  }
};
