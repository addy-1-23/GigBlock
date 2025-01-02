const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: String,
  username:String,
  email: String,
  password: String,
  contact:Number,
  place:String,
});

module.exports = mongoose.model("users", UserSchema);