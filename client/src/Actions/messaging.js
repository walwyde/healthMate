import {
  add_message,
  delete_message,
  init_convo,
  new_message,
  clear_messages,
  get_messages,
  init_convo_error,
  get_conversations,
  delete_conversation,
  get_conversations_error,
  delete_message_error,
  load_messages_error,
  load_new_messages
} from "./types";
import axios from "axios";
import { setAlert } from "../utils/setAlert";
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

export const deleteMessage =
  (conversationId, messageId) => async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5005/api/conversations/delete-message",
        { conversationId, messageId }
      );
      if (res.status === 200) {
        dispatch({
          type: delete_message,
          payload: messageId,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch(setAlert("something went Wrong", "danger"));
      dispatch({
        type: delete_message_error,
      });
    }
  };

export const initConversation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: clear_messages,
    });
    const res = await axios.post(
      `http://localhost:5005/api/conversations/${id}`,
      { _id: id }
    );
    if (res.data) {
      dispatch({
        type: init_convo,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: init_convo_error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
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
    dispatch({
      type: get_messages,
      payload: res.data,
    });
  } catch (error) {
    if (error.response.data.errors)
      error.response.data.errors.map((e) =>
        dispatch(setAlert(e.msg, "danger"))
      );
    console.log(error.response);
    dispatch({
      type: clear_messages,
    });
  }
};

export const deleteConvo = (convoId) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:5005/api/conversations/delete-conversation", {convoId})

    if(res.status === 200) {
      dispatch({
        type: delete_conversation,
        payload: convoId
      })
      dispatch(setAlert("Conversation Deleted", "info"))
    }
  } catch (err) {
    console.log(err)
  }
}

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
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const loadNewMessages = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5005/api/conversations/new-messages`);

    if (res.data && res.data.length > 0) {
      const payload = { messages: res.data, userId };
      dispatch(setAlert(`new message(s) alert`, "info"));

      dispatch({
        type: load_new_messages,
        payload: payload,
      });
    }
  } catch (error) {
    console.log(error.response);
    if (error.response.data.errors) {
      error.response.data.errors.map((e) =>
        dispatch(setAlert(e.msg, "danger"))
      );
    }
    dispatch({
      type: load_messages_error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const setViewed = (convoId, userId) => async (dispatch) => {
  try {
    dispatch({ type: viewed_messages, payload: { convoId, userId } });
  } catch (err) {
    console.log(err);
  }
};
