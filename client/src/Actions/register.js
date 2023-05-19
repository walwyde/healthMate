import {
  register_success,
  register_fail,
  user_loaded,
  load_error,
  log_out,
  clear_profile,
} from "./types";
import { setHeader } from "../utils/setHeader";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setHeader(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5005/api/auth");

    if (data) {
      dispatch({
        type: load_error,
      });
    }

    dispatch({
      type: user_loaded,
      payload: res,
    });
  } catch (err) {
    console.log(err.response);

    dispatch({
      type: load_error,
    });
  }
};



