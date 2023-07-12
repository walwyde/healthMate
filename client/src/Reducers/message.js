import { init_convo, new_message, delete_message, clear_messages, get_messages, init_convo_error, get_conversations, get_conversations_error} from "../Actions/types";

const initialState = {
  conversation: {},
  conversations: [],
  messages: [],
  newMessages: [],
  message: null,
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
        messages: [...state.messages, payload],
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
        messages: state.messages.filter((message) => message._id !== payload),
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
    default:
      return state;
  }
}