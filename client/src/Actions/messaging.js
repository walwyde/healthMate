import {
  add_message,
  delete_message,
  init_convo,
  new_message,
  clear_messages,
  get_messages,
  init_convo_error,
  get_conversations,
  get_conversations_error,
} from "./types";
import axios from "axios";

export const saveMessage = (data, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `http://localhost:5005/api/conversations/${id}/messages`,
      data
    );

    if (res) {
      dispatch({
        type: new_message,
        payload: res.data,
      });
      console.log(res.data); // Handle the response from the backend
    }
  } catch (error) {
    console.error(error); // Handle any errors that occur during the request
  }
};
export const initiateSocket = () => {
  const socket = socketIOClient(ENDPOINT);
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.on("newMessage", (data) => {
    console.log(data);
  });
  socket.on("typing", (data) => {
    console.log(data);
  });
  socket.on("stopTyping", (data) => {
    console.log(data);
  });
  socket.on("error", (data) => {
    console.log(data);
  });
  socket.on("connect_error", (data) => {
    console.log(data);
  });
  socket.on("connect_timeout", (data) => {
    console.log(data);
  });
  socket.on("reconnect", (data) => {
    console.log(data);
  });
  socket.on("reconnect_attempt", (data) => {
    console.log(data);
  });
  socket.on("reconnecting", (data) => {
    console.log(data);
  });
  socket.on("reconnect_error", (data) => {
    console.log(data);
  });
};

export const initConversation = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5005/api/conversations/${id}`,
      { _id: id }
    );
    if (res.data) {
      dispatch({
        type: clear_messages,
      });
      dispatch({
        type: init_convo,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: init_convo_error,
      payload: { msg: error.response.statusText, status: error.response.status },
    })
  }
};

export const getConvoMessages = (id) => async (dispatch) => {
  try {
    dispatch({
      type: clear_messages,
    });

    const res = await axios.get(
      `http://localhost:5005/api/conversations/${id}/messages`
    );
    console.log(res); // Handle the response from the backend
    if (res.data) {
      dispatch({
        type: get_messages,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5005/api/conversations`);
    console.log(res); // Handle the response from the backend
    if (res.data) {
      dispatch({
        type: get_conversations,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: get_conversations_error,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
}
