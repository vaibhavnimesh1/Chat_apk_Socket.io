const mongoose = require("mongoose");
const colors = require("colors");



const MONGO_URI  = "mongodb+srv://vaibhavnimesh1:3mhnJ5mRWXQG3kLh@cluster0.mycfgrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
