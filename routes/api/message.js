const express = require("express");
const controller = require("../../controllers/message");
const auth = require("../../middleware/index");

const router = express.Router();

router.get(
  "/conversations/:conversationId/messages",
  auth.auth,
  controller.getAllMessages
);

router.post("/conversations/:conversationId/messages", auth.auth, controller.getConversationById);


router.post('/', auth.auth, controller.newConversation);

module.exports = router;
