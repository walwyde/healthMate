import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import Loading from '../layouts/Loading'
import DoctorList from './DoctorList'
import {getDoctors} from '../../Actions/appointment'
import { connect } from 'react-redux'

const Appointments = ({
  getDoctors, appointment: {doctors, loading}
}) => {

  useEffect(() => {
    getDoctors();
  }, [loading]);


  return loading ? <Loading /> : (
    <Fragment>
   { !loading && doctors.length < 1 ? <h1 className='heading text-primary my-5'>No Doctors Available</h1> :
      <div>
        <h1>Available Doctors</h1>
        <DoctorList doctors={doctors} loading={loading}/>
      </div>}
      </Fragment>
  )
}

Appointments.propTypes = {
  getDoctors: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  appointment: state.appointment
})

export default connect(mapStateToProps, {getDoctors})(Appointments)