const express = require("express");
const {
  accessChat,
  fetchChat,
  createGroupChat,
} = require("../controllers/chat.controllers.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);

module.exports = router;
