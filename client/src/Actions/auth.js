import {login_fail, login_success} from './types'
import { setAlert } from '../utils/setAlert'
import {loadUser} from '../Actions/register'
import axios from 'axios'

export const login = ( formData, history) => async dispatch => {
  console.log(formData)
  const options = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8'
    },
  }

  try {
    // const res = await axios.post('http://localhost:5005/api/auth', formData, options)
    // console.log(res)

    const res = await axios.post('http://localhost:5005/api/auth', formData, options)

    console.log(res)
    
     history.push('/profile')

    dispatch({
      type: login_success,
      payload: {
        token: res
      }
    })
    dispatch(loadUser())
    dispatch(setAlert('You Have Been Logged In', 'success'))
  } catch (err) {
    console.log(err)
    if(err){
    dispatch(setAlert(err.message, 'danger'))
    }

    dispatch({
      type: login_fail,
    })
  }
}
export const register = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await axios.post("/api/users", formData, config);

    console.log(res);

    if (res.errors)
      return res.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );

    dispatch({
      type: register_success,
      payload: { token: res },
    });

    dispatch(loadUser())

    dispatch(setAlert("Registration Successful", "success"));
  } catch (err) {
    console.log(err);

    dispatch({
      type: register_fail,
    });
  }
};