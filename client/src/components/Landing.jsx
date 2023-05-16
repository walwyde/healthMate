import React from 'react'
import "../index.css";
import PropTypes from 'prop-types'

const Landing = props => {
  return (
        <div className="container">
          <h1>Welcome to Healthmate</h1>
          <p>Your personal health companion</p>
          <img className='home-image' src="/landing.jpg" alt="" srcSet="" />
          
          <a className="button" href="#">
            Get Started
          </a>
        </div>
  )
}

Landing.propTypes = {}

export default Landing