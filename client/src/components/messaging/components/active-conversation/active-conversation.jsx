import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import ConversationHeading from "./conversation-heading.jsx";
import MessageLog from "./message-log.jsx";
import NewMessageInput from "./new-message-input.jsx";

const activeCorrespondence = {
  id: 1,
  clinician: {
    id: 13,
    firstName: "Travis",
    lastName: "Outlaw",
    flagged: false,
  },
  client: {
    id: 109,
    firstName: "George",
    lastName: "Washington",
    currentLevelOfCare: "IOP",
    flagged: false,
  },
  messages: [
    {
      sender: "clinician",
      timeSent: "2016-05-16T17:45:40.276Z",
      message:
        "One family went so far as to rename their toddler son, telling People “we just felt like, this does not at all encompass the values that we want for our son to have and know.” And so, at 14 months, Atticus became Lucas.",
    },
    {
      sender: "client",
      timeSent: "2016-06-16T17:45:40.276Z",
      message:
        "But the survey found that mothers’ top reason for onomastic discontent was that they hadn’t been bold enough; 25 percent said the name they chose was too common, and 11 percent said it was not distinctive enough. It’s hard to imagine “James” being the cause of such angst, but this is an era in which blending in too much is as horrifying as standing out.",
    },
    {
      sender: "clinician",
      timeSent: "2016-07-16T17:45:40.276Z",
      message:
        "This is the kind of thing I would only ever tell George Washington.",
    },
  ],
};

const enteredText = "Time dey goo...";
const required = {
  activeCorrespondence,
  enteredText: "nothing for now",
  enterToSendStatus: false,
  handleSubmit: () => {
    e.preventDefault();

    console.log(this.enteredText);
  },
  handleTextChange: (e) => {
    e.preventDefault();
    console.log(e.target.value);
  },
};
//owns message array state, assembles subcomponents:
const api = () => (
  <Fragment>
    <div className="row">
      <div className="col-md-4">
        <ConversationHeading correspondent={activeCorrespondence.client} />
      </div>
      <div className="panel-body col-sm-1 col-md-8 ">
        <MessageLog activeCorrespondence={activeCorrespondence} />
        <div className="panel-footer">
          <NewMessageInput
            enteredText={required.enteredText}
            enterToSendStatus={required.enterToSendStatus}
            handleSubmit={required.handleSubmit}
            handleTextChange={required.handleTextChange}
          />
        </div>
      </div>
    </div>
  </Fragment>
);

export default api;

  