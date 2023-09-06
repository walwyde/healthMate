import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getConversations, deleteConvo } from "../../../Actions/messaging";

const MessageInterface = ({
  getConversations,
  deleteConvo,
  message: { conversations, loading },
  auth: { user, loading: authloading },
  history,
}) => {
  useEffect(() => {
    getConversations();
  }, [loading, getConversations, authloading]);

  const handleDeleteConvo = (convoId) => {
    console.log(convoId);
    deleteConvo(convoId);
  };

  if (!loading && conversations.length === 0)
    return (
      <Fragment>
        <p className="lead text-center mt-5 text-muted display-4">
          You have no conversations
        </p>
        <Link to="/profile" className="btn btn-primary btn-sm m-2">
          Go Back
        </Link>
      </Fragment>
    );
  return (
    !loading &&
    conversations && (
      <Fragment>
        <Link
          className="btn btn-primary btn-sm m-2"
          to="."
          onClick={() => history.push("/profile")}
        >
          Go Back
        </Link>
        <div className="mt-3">
          {!authloading &&
            !loading &&
            conversations.map((convo) => (
              <div key={convo._id} className="mb-3 card">
                <div className="card-body">
                  <h4 className="card-title">
                    {convo.participants[0]._id !== user._id
                      ? convo.participants[0].name
                      : convo.participants[1].name}
                    {convo.messages && convo.messages[convo.messages.length -1].seen.indexOf(user && user._id) === -1 ? " (Read)" : ""}
                  </h4>
                  <hr />
                  <p className="card-title m-2 text-muted">
                    {convo.messages.length > 0 &&
                      convo.messages[convo.messages.length - 1].content}
                  </p>
                  <Link
                    className="float-right badge badge-info "
                    to={`/message/${
                      convo.participants[0]._id !== user._id
                        ? convo.participants[0]._id
                        : convo.participants[1]._id
                    }`}
                  >
                    View Chat
                  </Link>
                  <button
                    onClick={() => handleDeleteConvo(convo._id)}
                    className="badge badge-danger"
                  >
                    delete chat
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Fragment>
    )
  );
};

MessageInterface.propTypes = {
  getConversations: PropTypes.func.isRequired,
  deleteConvo: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { getConversations, deleteConvo })(
  MessageInterface
);
