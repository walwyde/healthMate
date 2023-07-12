const { Conversation, Message } = require("../models/Message");
const User = require("../models/User");

// Controller to store a new message
exports.createMessage = async (req, res) => {
  console.log(req.body)
  try {

    const newMessage = new Message(req.body);

    // Save the message

    const savedMessage = await newMessage.save();

    const user = await User.findById(req.user.id).select("-password");

    user.messages.push(savedMessage._id);

    // Send the message to the client
    
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller to retrieve all messages
exports.getAllMessages = async (req, res) => {
  console.log(req.params)
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Controller to get a single message by ID
exports.getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { sender, content } = req.body;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Create a new message
    const message = new Message({
      conversation: conversation._id,
      sender,
      content,
    });

    // Save the message
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.newConversation = async (req, res) => {
  const participants = { correspondent: req.body._id, user: req.user.id };
  try {
    // Create a new conversation

    const existing = await Conversation.findOne(participants).populate("correspondent", ["name", "messages"]);

    if(existing) return res.status(200).json(existing);


    const conversation = await new Conversation(participants)
    // Save the conversation
    await conversation.save();

    const populatedConversation = await Conversation.findOne(participants).populate("correspondent", ["name", "messages"]);


    res.status(201).json(populatedConversation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.user.id,
    }).populate("correspondent", ["name", "messages"]);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
}
