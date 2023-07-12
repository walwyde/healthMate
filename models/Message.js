const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  correspondent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const MessageSchema = new mongoose.Schema({
  
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);
const Message = mongoose.model("Message", MessageSchema);

module.exports = {
  Conversation,
  Message,
};
