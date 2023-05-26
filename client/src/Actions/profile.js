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
} from "./types";
import { setAlert } from "../utils/setAlert";

export const loadCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: clear_profile,
  });
  try {
    const res = await axios.get("http://localhost:5005/api/profile/me");

    console.log(res);

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
    const res = await axios.post(
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
export const editProfile =
  (formData, history, condition) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      };
      if (condition === "hypertensive") {
        let medications = [];
        let pressureReadings = [];

        const { medName, medDose, frequency, systolic, diastolic } = formData;

        medName.split(",").map((item, i) => {
          let medication = {
            name: item,
            dose: medDose.split(",")[i],
            frequency: frequency.split(",")[i],
          };

          medications.push(medication);
        });

        systolic.split(",").map((item, i) => {
          let reading = {
            systolic: item,
            diastolic: diastolic.split(",")[i],
          };
          pressureReadings.push(reading);
        });

        var reFormed = { ...formData, medications, pressureReadings };

        reFormed.medications = medications;
        reFormed.bloodPressureReadings = pressureReadings;
      }

      if (condition === "diabetic") {
        const config = {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        };
        let medications = [];
        let emergencyContact = {};
        let doctor = {};

        var reFormed = { ...formData };

        const {
          medName,
          medDose,
          frequency,
          contactName,
          contactPhone,
          docName,
          docPhone,
          docEmail,
        } = formData;

        medName.split(",").map((item, i) => {
          let medication = {
            name: item,
            dose: medDose.split(",")[i],
            frequency: frequency.split(",")[i],
          };

          medications.push(medication);
        });

        if (contactName && contactPhone)
          emergencyContact = {
            name: contactName,
            phone: contactPhone,
          };

        if ((docName && docPhone, docEmail))
          doctor = {
            docName: docName,
            docPhone: docPhone,
            docEmail: docEmail,
          };

        reFormed.medications = medications;
        reFormed.emergencyContact = emergencyContact;
        reFormed.doctor = doctor;
      }

      console.log(reFormed);

      const res = await axios.put(
        `http://localhost:5005/api/profile/me`,
        reFormed,
        config
      );

      console.log(res);
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
      console.log(err);
      dispatch(setAlert("Profile Edit Error", "danger"));

      dispatch({
        type: profile_error,
      });
    }
  };

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5005/api/profile/${userId}`
    );

    console.log(response.data);

    dispatch({
      type: load_profile,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: profile_error,
      payload: err.response.data,
    });
  }
};
