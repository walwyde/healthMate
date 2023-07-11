import React from "react";

//owns new message, enterToSend states; handles all form events
const api = ({
  handleSubmit,
  enteredText,
  handleTextChange,
}) => (
  <form className="mx-5" onSubmit={handleSubmit}>
    <div className="form-group mb-3">
      <input
        placeholder="Your Message"
        type="textarea"
        rows="5"
        value={enteredText}
        onChange={handleTextChange}
      />
      <input className="btn btn-primary" type="submit" value="Send" />
    </div>
  </form>
);

export default api;
