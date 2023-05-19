import { set_alert, remove_alert } from '../Actions/types'

const initialState = []

export default function ( state = initialState, action) {

  const { type, payload  } = action

  switch(type) {
    case set_alert: 
      return [...state, payload]
    case remove_alert:
      return state.filter(alert => alert.id !== payload)
    default:
      return state;
  }
  
};
