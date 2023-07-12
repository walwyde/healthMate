import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alerts from './alerts'
import appointment from './appointment'
import message from './message'

 const rootReducer=combineReducers({
  alerts,
  message,
  profile,
  appointment,
  auth
})

export default rootReducer