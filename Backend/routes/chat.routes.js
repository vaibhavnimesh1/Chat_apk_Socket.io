const express = require("express");
const { accessChat, fetchChat } = require("../controllers/chat.controllers.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, fetchChat);

module.exports = router;
