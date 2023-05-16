import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import post from './post'

 const rootReducer=combineReducers({
  post,
  profile,
  auth
})

export default rootReducer