const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");
const generateToken = require("../config/generatetoken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, pic, email, password } = req.body;
  console.log(name, pic, email, password);

  if ([name, email, password].some((field) => !field || field.trim() === "")) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const existedUser = await User.findOne({ email });
  console.log(existedUser);

  if (existedUser) {
    return res.status(400).json({ error: "User already exists!" });
  }

  const user = new User({
    name,
    pic: pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    email,
    password,
  });

  await user.save();

  const token = generateToken(user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token,
  });
});

module.exports = { registerUser };
