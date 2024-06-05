const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model.js");
const User = require("../models/user.model.js");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not sent with req");
    return res.sendStatus(400);
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      return res.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res.status(200).send(fullChat);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return res.status(200).send(populatedResults);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
const createGroupChat = asyncHandler(async (req, res) => {
  
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  try {
    const users = JSON.parse(req.body.users.trim());

    if (!Array.isArray(users) || users.length < 2) {
      return res.status(400).send("Invalid format for users field or at least 2 users are required");
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    // Log error for debugging
    console.error("Error parsing JSON:", error);
    res.status(400).send("Error parsing JSON data");
  }
});



module.exports = { accessChat, fetchChat, createGroupChat };
