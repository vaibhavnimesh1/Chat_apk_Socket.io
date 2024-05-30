const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db.js");

const userRoutes = require("./routes/user.routes.js");
const { errorHandler, notFound } = require("./middleware/error.middleware.js");

dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, console.log("DB CONNECTED"));
