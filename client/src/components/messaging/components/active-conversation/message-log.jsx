import React, {useEffect} from 'react';
import PropTypes from 'prop-types'

import Helper from '../../helper.jsx';
import MessageRow from './message-row.jsx';

//creates array of MessageRows

const api = ({activeCorrespondence}) => {
  
    return (
      <div className="messages-display" >
        {activeCorrespondence.messages.map((message,index) => <MessageRow message={message} correspondent={activeCorrespondence.client} key={index}/>)}
      </div> 
    );
  }


api.propTypes = {
  activeCorrespondence: PropTypes.object.isRequired
};


export default api;