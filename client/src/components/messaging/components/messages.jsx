import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getConversations } from "../../../Actions/messaging";
import { Row, Col, Card } from "react-bootstrap";

const MessageInterface = ({
  getConversations,
  message: { conversations, loading },
}) => {

  useEffect(() => {
    getConversations();
  }, []);

  if(conversations.length === 0) return (
    <Fragment>
      <p className="lead text-center mt-5 text-muted display-4">
        You have no conversations
      </p>
      <Link to="/profile" className="btn btn-primary btn-sm m-2">
        Go Back
      </Link>
    </Fragment>
  )


  return (
    <Row>
      <Col>
        <div className="mt-3">
          {!loading && conversations.map((convo) => (
            <Card key={convo._id} className="mb-3">
              <Card.Body>
                <Card.Title>{convo.correspondent && convo.correspondent.name}</Card.Title>
                <hr />
                <Card.Subtitle className="m-2 text-muted">
                  {convo.correspondent && convo.correspondent.messages[0].text}
                </Card.Subtitle>
                <Link
                  className="float-right badge badge-info "
                  to={`/message/${convo.correspondent._id}`}
                >
                  View Chat
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Col>
    </Row>
  );
};

MessageInterface.propTypes = {
  getConversations: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, { getConversations })(MessageInterface);
