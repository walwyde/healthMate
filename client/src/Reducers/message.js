import {
  init_convo,
  new_message,
  load_new_messages,
  delete_message,
  clear_messages,
  get_messages,
  init_convo_error,
  load_messages_error,
  get_conversations,
  get_conversations_error,
  delete_message_error,
  delete_conversation,
  viewed_messages,
  log_out
} from "../Actions/types";

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
    case load_new_messages:
      const newMessages = payload.messages.filter((m) => {
        console.log(m);
        return m.seen.indexOf(payload.userId) === -1;
      });
      return {
        ...state,
        newMessages: newMessages,
        error: payload.userId,
        loading: false,
      };
    case viewed_messages:
      return {
        ...state,
        newMessages: state.newMessages.filter((msg) => {
          return msg.conversation === payload.convoId;
        }),
        loading: false,
        error: payload,
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
          messages: [payload, ...state.conversation.messages],
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
          messages: state.conversation.messages.filter(
            (m) => m._id !== payload
          ),
        },
        messages: state.messages.filter((message) => message._id !== payload),
        loading: false,
      };
    case delete_message_error:
    case load_messages_error:
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
    case log_out:
      return {
        ...state,
        conversation: {},
        conversations: [],
        messages: [],
        newMessages: [],
        loading: true,
        error: {},
      };
    default:
      return state;
  }
}
