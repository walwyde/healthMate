import {
  register_success,
  register_fail,
  user_loaded,
  load_error,
  login_success,
  login_fail,
  log_out,
  delete_account,
  profile_image_update
} from "../Actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case profile_image_update:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case login_success:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case user_loaded:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case register_success:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case login_fail:
    case load_error:
    case register_fail:
    case log_out:
    case delete_account:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
