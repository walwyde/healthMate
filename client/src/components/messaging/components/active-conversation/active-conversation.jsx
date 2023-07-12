import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../../../layouts/Loading";
import { connect } from "react-redux";
import {
  initConversation,
  saveMessage,
  getConvoMessages,
} from "../../../../Actions/messaging";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { setAlert } from "../../../../utils/setAlert";

//owns message array state, assembles subcomponents:
const api = ({
  match,
  initConversation,
  getConvoMessages,
  saveMessage,
  message: { messages, conversation, loading },
  auth: { user },
}) => {
  const [message, setMessage] = useState({
    sender: conversation && conversation.user,
    conversation: conversation && conversation._id,
    timeSent: Date.now(),
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newMessages = [...messages, message];

    saveMessage(message, conversation._id);
    setMessage({
      sender: conversation && conversation.user,
      conversation: conversation && conversation._id,
      timeSent: Date.now(),
      content: "",
    });
  };
  const handleTextChange = (e) => {
    e.preventDefault();
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const listenForEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setAlert('Click "send" To send message', "warning");
    }
  };

  useEffect(() => {
    match.params && initConversation(match.params._id);
    conversation && getConvoMessages(conversation._id);
  }, [match.params._id, conversation._id, loading]);

  if (!loading && !conversation)
    return (
      <Fragment>
        <p className="lead text-center mt-5 text-muted display-4">
          Unable to initialize conversation, please try again
        </p>
        <Link to="/messages" className="btn btn-primary btn-sm m-2">
          Go Back
        </Link>
      </Fragment>
    );

  return (
    <Fragment>
      <div className="row">
        {conversation && conversation.correspondent && (
          <Fragment>
            <div className="col-md-4 d-block d-sm-none d-md-block">
              <div className="card">
                <div className="card-image m-auto">
                  <img src="https://picsum.photos/200" alt="" />
                </div>

                <div className="card-content">
                  <p className="card-text text-center lead">
                    {conversation.correspondent &&
                      conversation.correspondent.name}{" "}
                  </p>
                </div>
                <Link className="card-link btn btn-primary m-2" to="/messages">
                  Close Chat
                </Link>
              </div>
            </div>

            <div className="col-md-8 ">
              <div>
                {loading ? (
                  <Fragment>
                    <Loading />
                  </Fragment>
                ) : !loading && messages.length > 0 ? (
                  messages.map((message) => (
                    <Fragment>
                      <div className="card mb-3 px-3" key={message._id}>
                        <div className="card-header">
                          <h4 className="card-title">
                            {message.sender === "clinician" ? (
                              <span className="badge badge-pill badge-success">
                                Clinician
                              </span>
                            ) : (
                              <span className="badge badge-pill badge-primary">
                                Me
                              </span>
                            )}
                          </h4>
                        </div>
                        <div className="card-content p-2 bg-dark text-white rounded">
                          <p className="card-text ">{message.content}</p>
                        </div>

                        <div className="card-text">
                          <small className="text-muted m-2">
                            <Moment fromNow>{message.timeSent}</Moment>
                          </small>
                        </div>
                      </div>
                    </Fragment>
                  ))
                ) : (
                  <p className="lead text-center mt-5 text-muted display-4">
                    No messages yet
                  </p>
                )}
              </div>
            </div>
          </Fragment>
        )}
        <div className="col-md-4"></div>
        <div className="col-md-8 mx-auto">
          <form className="container-fluid mx-5" onSubmit={handleSubmit}>
            <div className="form-group mb-3 fluid">
              <input
                placeholder="Your Message"
                type="textarea"
                name="content"
                value={message.content}
                onChange={handleTextChange}
                onKeyDown={(e) => listenForEnterKey(e)}
                className="p-3"
              />
              <input
                className="btn btn-primary p-3"
                type="submit"
                value="Send"
                disabled={message.content === "" && "disabled"}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

api.propTypes = {
  match: PropTypes.object.isRequired,
  initConversation: PropTypes.func.isRequired,
  getConvoMessages: PropTypes.func.isRequired,
  saveMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message,
});

export default connect(mapStateToProps, {
  initConversation,
  saveMessage,
  getConvoMessages,
})(api);
