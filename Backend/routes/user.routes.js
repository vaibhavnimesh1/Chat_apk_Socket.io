const express = require("express");

const router = express.Router();

const {registerUser} = require("../controllers/user.controller.js");

console.log(registerUser);
// router.route("/login", userRoute);   
console.log("routes");

router.route("/").post(registerUser);

module.exports = router;
