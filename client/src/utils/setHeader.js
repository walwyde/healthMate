import axios from 'axios'

export const setHeader = (token) => {
  if(token) {axios.defaults.headers.common['x-auth-token'] = token} else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export const api = axios.create({
  baseURL: 'http://localhost:5005', // Set the base URL to match the proxy route in package.json

  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "x-auth-token": localStorage.getItem('token')
  },

  withCredentials: true,

  timeout: 3000,

  responseType: 'json',

  responseEncoding: 'utf8',

});

