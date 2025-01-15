const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
  contact: Number,
  place: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] // Add connections field
});

module.exports = mongoose.model("users", UserSchema);