import {
  init_convo,
  new_message,
  delete_message,
  clear_messages,
  get_messages,
  init_convo_error,
  get_conversations,
  get_conversations_error,
  delete_message_error,
  delete_conversation,
} from "../Actions/types";
import { setAlert } from "../utils/setAlert";

const initialState = {
  conversation: {},
  conversations: [],
  messages: [],
  newMessages: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case init_convo:
      return {
        ...state,
        conversation: payload,
        loading: false,
      };
    case get_conversations:
      return {
        ...state,
        conversations: payload,
        loading: false,
      };
    case get_conversations_error:
      return {
        ...state,
        conversations: [],
        error: payload,
        loading: false,
      };
    case new_message:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [payload, ...state.conversation.messages]
        },
        messages: [payload, ...state.messages],
        loading: false,
      };
    case get_messages:
      return {
        ...state,
        messages: payload,
        loading: false,
      };
    case delete_message:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: state.conversation.messages.filter(m => m._id !== payload)
        },
        messages: state.messages.filter((message) => message._id !== payload),
        loading: false,
      };
    case delete_message_error:
      setAlert("Failed to delete Message", "danger");
      return {
        ...state,
        messages: [...state.messages],
        loading: false,
      };
    case clear_messages:
      return {
        ...state,
        messages: [],
        loading: false,
      };
    case init_convo_error:
      return {
        ...state,
        conversation: null,
        error: payload,
        loading: false,
      };
    case delete_conversation:
      return {
        ...state,
        conversations: state.conversations.filter((c) => c._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
