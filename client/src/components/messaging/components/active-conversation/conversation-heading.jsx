import React from 'react';
import PropTypes from 'prop-types'

//simply displays name of correspondent
const api = ({correspondent}) => (  
  <div className="jumbotron mt-2">
      <div class="col-md-1 d-none d-sm-block">
          <div>
         <img className="rounded" src="https://picsum.photos/200" alt="" srcset="" />
          </div>
        </div>
    <h3 className='text-info mt-3 lead'>{correspondent.firstName}</h3>
    </div>
);  

api.propTypes = {
  correspondent: PropTypes.object.isRequired
};


export default api;