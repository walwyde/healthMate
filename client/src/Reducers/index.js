import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alerts from './alerts'
import appointment from './appointment'

 const rootReducer=combineReducers({
  alerts,
  profile,
  appointment,
  auth
})

export default rootReducer