import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const MessageInterface = () => {

  const messages = [
    { sender: 'John', _id: "1", text: 'Hello' },
    { sender: 'Jane', _id: "2", text: 'Hi there' },
    { sender: 'John', _id: "3", text: 'How are you?' },
    { sender: 'Jane', _id: "3", text: 'I\'m good, thanks!' },
  ];

  
  return (
      <Row>

        <Col>
        <div className='mt-3'>
          {messages.map((message) => (
            <Card key={message._id} className="mb-3">
              <Card.Body>
                <Card.Title>{message.sender}</Card.Title>
                <Card.Text>{message.text}</Card.Text>
                <Card.Link className="float-right" href={`/message/${message._id}`}>Open</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
        </Col>
      </Row>
  );
};

export default MessageInterface;
