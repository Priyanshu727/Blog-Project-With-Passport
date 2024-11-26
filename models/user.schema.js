const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: Number,
});

const user = mongoose.model("userTbl", userSchema);

module.exports = user;
