const asyncHandler = require("express-async-handler");

const User = require("../models/user.model.js");
const generateToken = require("../config/generatetoken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, pic, email, password } = req.body;

  if (
    [name, pic, email, password].some((field) => !field || field.trim() === "")
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existedUser = await User.findone({
    email,
  });

  if (existedUser) {
    res.status(400);
    res.json("User Already Existed!!!");
  }

  const user = await User.create({
    name,
    pic,
    email,
    password,
    token: generateToken(user._id),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    res.json("User Created Successfully!!");
  } else {
    res.status(400);
    res.json("Failed To Create  User !!!");
  }
});

module.exports = { registerUser };
