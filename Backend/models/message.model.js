const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: {
      type: String,
      trim: true,
    },
  },
  { timestaps: true }
);

module.exports = mongoose.model("User", chatModel);