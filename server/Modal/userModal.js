const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
  },
  authType: String,
  credit: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
