import axios from 'axios'
import {create_profile} from './types'


export const createProfile = (formData, history, userType=user) => async dispatch => {

  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  switch(userType) {
    case "staff": 
    const res = await axios.post('/api/profile', formData, options)
  }

  try {
    
  } catch (error) {
    console.log(error)
  }

}
