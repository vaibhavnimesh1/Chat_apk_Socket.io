const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db.js");

const userRoutes = require("./routes/user.routes.js");

dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());
app.use("api/user", userRoutes);

app.listen(3000, console.log("DB CONNECTED"));
