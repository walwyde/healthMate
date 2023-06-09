import React from 'react';
import PropTypes from 'prop-types'

//simply displays name of correspondent
const api = ({correspondent}) => (  
  <div className="jumbotron">
    <h3 className='text-info mt-3'>conversation with {correspondent.firstName}</h3>
    </div>
);  

api.propTypes = {
  correspondent: PropTypes.object.isRequired
};


export default api;