import React from 'react';
import Moment from 'react-moment';
import MessageContentBox from './message-content-box.jsx';

//assembles message display from date,  sender, content
const api = ({message, correspondent}) => (
  <div className='bg-light py-1 my-2'>
    <div className={'message '+(message.sender==='clinician' ? 'from-user' : 'to-user')}>
      <div className="message-header m-2">
        <div className=" fw-bold fs-2 message-author ">{message.sender==='clinician' ? 'Me' : correspondent.firstName}</div>
      </div>
      <MessageContentBox content={message.message} />
      <div className="message-time badge bg-primary ms-2">
        <Moment fromNow>{message.timeSent}</Moment></div>
    </div>
  </div>
);

export default api;