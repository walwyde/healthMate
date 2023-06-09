import React from "react";

import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

import EnterToSend from "./enter-to-send.jsx";

//owns new message, enterToSend states; handles all form events
const api = ({
  handleSubmit,
  enteredText,
  handleTextChange,
  listenForEnter,
  enterToSendStatus,
  handleCheckboxChange,
}) => (
  <Form className="my-4" onSubmit={handleSubmit}>

    <InputGroup className="mb-3">
    <Form.Control
      placeholder="Your Message"
      as="textarea"
      rows="6"
      value={enteredText}
      onChange={handleTextChange}
      onKeyPress={listenForEnter}
    />
    <input className="btn btn-primary" type="submit" value="Send" />
    </InputGroup>

    <InputGroup className="m-3">
    <EnterToSend
      enterToSendStatus={enterToSendStatus}
      handleCheckboxChange={handleCheckboxChange}
    />
    </InputGroup>
  </Form>
);

export default api;
