import axios from "axios";

import {
  load_profile,
  load_profiles,
  profile_error,
  delete_experience,
  delete_education,
  delete_account,
  clear_profile,
  delete_profile_error,
  get_repos,
  no_repos,
} from "./types";
import { setAlert } from "../utils/setAlert";

export const loadCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: clear_profile,
  });
  try {
    const res = await axios.get("http://localhost:5005/api/profile/me");

    dispatch({
      type: load_profile,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: profile_error,
    });
  }
};

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
          : await axios.post(
              "http://localhost:5005/api/users",
              formData,
              config
            );

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

  export const getProfileById = (userId) => async (dispatch) => {
    try {
      const response = await axios.get(`/api/profile/user/${userId}`);
  
      dispatch({
        type: load_profile,
        payload: response.data,
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: profile_error,
        payload: err.response,
      });
    }
  };
