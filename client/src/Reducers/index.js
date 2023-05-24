import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alerts from './alerts'

 const rootReducer=combineReducers({
  alerts,
  profile,
  auth
})

export default rootReducer