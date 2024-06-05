const express = require("express");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/user.controller.js");


router.route("/").post(registerUser).get( protect  , allUser);
router.post("/login", authUser);

module.exports = router;
