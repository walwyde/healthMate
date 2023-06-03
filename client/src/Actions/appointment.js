import axios from 'axios';
import {
  get_appointments,
  get_appointment,
  no_appointments,
  no_appointment,
  new_appointment,
  appointment_error,
  delete_appointment,
  update_appointment,
  delete_appointment_error,
  get_doctors,
  get_doctor,
  no_doctors,
  no_doctor

} from './types'


export const getDoctors = () => async dispatch => {
  try {

    const res = await axios.get('http://localhost:5005/api/users');
    dispatch({
      type: get_doctors,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: no_doctors,
      payload: { msg: err.response.data, status: err.response.status }
    });

  }
}


// Get all appointments

export const getAppointment = () => async dispatch => {
  try {
    const res = await axios.get('/api/appointment');
    dispatch({
      type: get_appointment,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status }
    });
  }
}

export const newAppointment = (doctor, time, date) => async dispatch => {
  const formData = {
    doctor,
    time,
    date
  }
  try {
    const res = await axios.post('http://localhost:5005/api/appointment', formData);
    dispatch({
      type: new_appointment,
      payload: res.data
    });
    dispatch(setAlert('Appointment Created', 'success'));
  } catch (err) {
    // dispatch({
    //   type: appointment_error,
    //   payload: { msg: err.response, status: err.response.status }
    // });
    console.log(err.response)
  }
}

export const deleteAppointment = id => async dispatch => {
  try {
    await axios.delete(`/api/appointment/${id}`);
    dispatch({
      type: delete_appointment,
      payload: id
    });
    dispatch(setAlert('Appointment Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status }
    });
  }
}

export const updateAppointment = (id, formData) => async dispatch => {
  try {
    const res = await axios.put(`/api/appointment/${id}`, formData);
    dispatch({
      type: update_appointment,
      payload: { id, appointment: res.data }
    });
    dispatch(setAlert('Appointment Updated', 'success'));
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status }
    });
  }
}

export const setCurrentAppointment = appointment => async dispatch => {
  dispatch({
    type: set_current_appointment,
    payload: appointment
  });
}

export const clearCurrentAppointment = () => async dispatch => {
  dispatch({
    type: clear_current_appointment
  });
}

export const filterAppointment = text => async dispatch => {
  dispatch({
    type: filter_appointment,
    payload: text
  });
}
