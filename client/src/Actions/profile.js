import axios from "axios";
import { api } from "../utils/setHeader";

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
import { set } from "mongoose";

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

export const createProfile = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await api.put(
      "http://localhost:5005/api/profile/me",
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

/**
 * Edit user profile
 * @param formData - The form data to be edited
 * @param history - The history object for navigation
 * @param id - The id of the user
 * @param userType - Optional user type, defaults to "user"
 * @returns Promise<void>
 */
export const editProfile = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await api.put(`/api/profile/me`, formData, config);

    if (res.data.errors)
      return res.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );

    if (res) history.push("/profile");

    dispatch({
      type: load_profile,
      payload: res.data,
    });

    dispatch(setAlert("Profile Edit Successful", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch(setAlert("Profile Edit Error", "danger"));

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
    console.log(err);
    dispatch({
      type: profile_error,
      payload: err.response,
    });
  }
};
