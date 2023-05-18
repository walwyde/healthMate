import axios from 'axios'

const setHeader = (token) => {
  if(token) {axios.default.headers.common['x-auth-token'] = token} else {
    delete axios.default.headers.common['x-auth-token']
  }
}