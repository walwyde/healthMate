import {
  login_fail,
  login_success,
  register_success,
  register_fail,
  log_out,
  clear_profile,
} from "./types";

import { setAlert } from "../utils/setAlert";
import { loadUser } from "../Actions/register";
import axios from "axios";

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
    console.log(err);
    const errors = err.response.data.errors

    if(err.response.code === "ERR_NETWORK") {
      dispatch(setAlert(err.message, "danger"))
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

  console.log(reFormed.condition);

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

    history.push("/profile");

    dispatch({
      type: register_success,
      payload: { token: res.data },
    });

    dispatch(loadUser());

    dispatch(setAlert("Registration Successful", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

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
    type: log_out,
  });
};
