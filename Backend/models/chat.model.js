const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },

  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User " }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message ",
  },
  isGroupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
  },
});

module.exports = mongoose.Model("Chat", chatModel);
