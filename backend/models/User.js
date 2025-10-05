const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
