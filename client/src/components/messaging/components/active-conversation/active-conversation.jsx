import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import lodash from "lodash";
import Loading from "../../../layouts/Loading";
import { connect } from "react-redux";
import {
  initConversation,
  saveMessage,
  getConvoMessages,
  deleteMessage,
} from "../../../../Actions/messaging";
import Moment from "react-moment";
import { Link } from "react-router-dom";

//owns message array state, assembles subcomponents:
const api = ({
  match,
  initConversation,
  getConvoMessages,
  saveMessage,
  deleteMessage,
  message: { loading, messages, conversation },
  auth: { user, loading: authloading },
}) => {
  useEffect(() => {
    initConversation(match.params._id);
  }, [loading, authloading, initConversation, match.params._id]);

  const [message, setMessage] = useState({
    sender: !authloading && user && user._id,
    conversation: !loading && conversation && conversation._id,
    timeStamp: Date.now(),
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newMessages = [...messages, message];

    saveMessage(message, conversation._id);

    setMessage({
      sender: !authloading && user._id,
      conversation: !loading && conversation._id,
      timeStamp: "",
      content: "",
    });
  };
  const handleTextChange = (e) => {
    e.preventDefault();
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleMessageDelete = (conversationId, messageId) => {
    deleteMessage(conversationId, messageId);
    console.log(conversationId, messageId);
  };

  const listenForEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
      toast.info('Click "send" To send message');
    }
  };

  const orderedMessages =
    !loading && lodash.orderBy(conversation.messages, ["timeStamp"], "desc");

  const mapMessages = (messages) =>
    messages.map((message) => (
      <div className="card mb-3 px-3" key={!loading && message._id}>
        <div className="card-header">
          <h4 className="card-title">
            {message.sender === user._id ? (
              <span className="badge badge-pill badge-success">me</span>
            ) : (
              <span className="badge badge-pill badge-primary">
                {conversation.participants[1]._id !== user._id
                  ? conversation.participants[1].name
                  : conversation.participants[0].name}
              </span>
            )}
          </h4>
        </div>

        <div className="card-content p-2 bg-dark text-white rounded">
          <p className="card-text ">{message.content}</p>
          <span className=" cart-text text-muted m-2">
            <Moment format="DD-MM-YYYY">{message.timeStamp}</Moment>
          </span>

          {message.sender === user._id && (
            <button
              onClick={() => handleMessageDelete(conversation._id, message._id)}
              className="card-action float-right btn-danger btn-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    ));

  const renderMessageInput = () => (
    <div>
      <Link className="btn btn-primary m-2 float-left d-md-none" to="/messages">
        Close Chat
      </Link>
      <form onSubmit={handleSubmit} className="container-fluid">
        <div className="form-group mb-3">
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
  );

  if (!loading && !conversation) {
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
  }

  return (
    <div className="row">
      {!loading && conversation.participants && (
        <Fragment>
          <div className="col-md-4 d-sm-none d-md-block">
            <div style={{height: "10rem"}} className="card">
              <div style={{height: "100%", width: "100%"}} className="card-image m-auto">
                <img
                  src={
                    !authloading &&
                    !loading &&
                    conversation.participants[0]._id !== user._id
                      ? `http://localhost:5005/${
                          conversation.participants[0] &&
                          conversation.participants[0].avatar
                        }`
                      : `http://localhost:5005/${
                          conversation.participants[1] &&
                          conversation.participants[1].avatar
                        }`
                  }
                  alt="avatar"
                  className= "img-fluid"
                  style={{width: "100%", height: "100%"}}
                />
              </div>

              <div className="card-content">
                <p className="card-text text-center lead">
                  {!authloading &&
                  !loading &&
                  conversation &&
                  conversation.participants[0]._id !== user._id
                    ? conversation.participants[0].name
                    : conversation.participants[1].name}
                </p>
              </div>
              <Link className="card-link btn btn-primary m-2" to="/messages">
                Close Chat
              </Link>
            </div>
          </div>
        </Fragment>
      )}

      <div className="col-md-7">
        <div>{renderMessageInput()}</div>

        {authloading && loading ? (
          <Fragment>
            <Loading />
          </Fragment>
        ) : !authloading &&
          !loading &&
          conversation &&
          conversation.messages &&
          conversation.messages.length > 0 ? (
          <Fragment>
            <div>{mapMessages(orderedMessages)}</div>
          </Fragment>
        ) : (
          <Fragment>
            <h3 className="text-center m-auto">No messages Yet</h3>
          </Fragment>
        )}
      </div>
    </div>
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
  deleteMessage,
  getConvoMessages,
})(api);
