import {
  load_profile,
  load_profiles,
  profile_error,
  clear_profile,
  delete_education,
  delete_experience,
  delete_profile_error,
  load_availability,
} from "../Actions/types";

const initialState = {
  profile: null,
  viewedProfiles: [],
  profiles: [],
  loading: true,
  errors: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case load_profile:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case load_profiles:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case profile_error:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: payload,
      };
    case clear_profile:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case delete_profile_error:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case load_availability:
      return {
        ...state,
        profile: { ...state.profile, availability: payload },
      };
    default:
      return state;
  }
}
