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
  load_availability
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
      case get_doctors:
      return {
        ...state,
        doctors: payload,
        loading: false,
      }
    default:
      return state;
  }
}
