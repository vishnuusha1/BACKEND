const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 6,
    max: 10,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 10,
    required: true,
  },
  email: {
    type: String,
    max: 20,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", userSchema);
