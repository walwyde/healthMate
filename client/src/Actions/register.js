import {
  register_success,
  register_fail,
  user_loaded,
  load_error,
  log_out,
  clear_profile,
} from "./types";
import { setAlert } from "../utils/setAlert";
import { setHeader } from "../utils/setHeader";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setHeader(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    if (!res.data) {
      dispatch({
        type: load_error,
      });
    }

    dispatch({
      type: user_loaded,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);

    dispatch({
      type: load_error,
    });
  }
};

export const register =
  (formData, history, userType = user) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    try {
      switch (userType) {
        case "staff":
          return (res = await axios.post("/api/workers", formData, config));
        case "user":
          return (res = await axios.post("/api/users", formData, config));
        default:
          return (res = await axios.post("/api/workers", formData, config));
      }
      if (res.errors)
        return res.errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger"))
        );

      dispatch({
        type: register_success,
        payload: { token: res },
      });

      dispatch(loadUser());

      dispatch(setAlert("Registration Successful", "success"));
    } catch (err) {
      console.log(err);

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
