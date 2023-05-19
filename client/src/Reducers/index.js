import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import post from './post'
import alerts from './alerts'

 const rootReducer=combineReducers({
  alerts,
  post,
  profile,
  auth
})

export default rootReducer