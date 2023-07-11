import {
  get_doctors,
  get_doctor,
  no_doctors,
  no_doctor,
  get_appointments,
  get_appointment,
  no_appointments,
  no_appointment,
  new_appointment,
  appointment_error,
  delete_appointment,
  update_appointment,
  delete_appointment_error,
  load_availability,
  approved_appointment,
} from "../Actions/types";

const initialState = {
  appointments: [],
  doctors: [],
  appointment: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case get_appointments:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
      };
    case get_appointment:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case get_doctors:
      return {
        ...state,
        doctors: payload,
        loading: false,
      };
    case new_appointment:
      const find = state.appointments.find((app) => app._id === payload._id);
      return {
        ...state,
        appointments: find
          ? [
              ...state.appointments.filter((app) => app._id !== payload._id),
              payload,
            ]
          : [...state.appointments, payload],
        loading: false,
      };
    case delete_appointment:
      return {
        ...state,
        appointments: state.appointments.filter((app) => app._id !== payload),
        loading: false,
      };
    case approved_appointment:
      const apps = [...state.appointments];
      const app = state.appointments.find((app) => app._id === payload._id);
      const index = state.appointments.indexOf(app);
      apps[index] = payload;
      return { ...state, appointments: apps, loading: false };
    default:
      return state;
  }
}
