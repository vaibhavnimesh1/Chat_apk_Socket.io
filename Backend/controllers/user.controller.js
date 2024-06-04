const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");
const generateToken = require("../config/generatetoken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, pic, email, password } = req.body;
  console.log(name, pic, email, password);

  if ([name, email, password].some((field) => !field || field.trim() === "")) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const existedUser = await User.findOne({ email });
  console.log(existedUser);

  if (existedUser) {
    return res.status(400).json({ error: "User already exists!" });
  }

  const user = new User({
    name,
    email,
    password,
    pic:
      pic ||
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
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

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  console.log(keyword);

  const filter = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(filter).find({ _id: { $ne: req.user._id } });

  console.log(users);
  res.send(users);
});

module.exports = { registerUser, authUser, allUser };
