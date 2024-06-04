const express = require("express");
// const { protected } = require("../middleware/auth.middleware.js");

const router = express.Router();

const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/user.controller.js");

router.route("/").post(registerUser).get(allUser);
router.post("/login", authUser);

module.exports = router;
