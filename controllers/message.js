const { Conversation, Message } = require("../models/Message");


// Controller to store a new message
exports.createMessage = async (req, res) => {
  try {
    const { content, sender } = req.body;

    const newMessage = new Message({
      content,
      sender,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller to retrieve all messages
exports.getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

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
}

exports.newConversation = async (req, res) => {
  console.log(req.body)
  try {
    const { participants } = req.body;

    // Create a new conversation
    const conversation = await new Conversation({
      participants,
    });

    // Save the conversation
    // await conversation.save();

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversation' });
  }
}
