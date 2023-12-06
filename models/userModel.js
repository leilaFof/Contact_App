const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "please add username"] },
    email: {
      type: String,
      required: [true, "please add useremail"],
      unique: [true, "Email adrress already taken"],
    },
    password: { type: String, required: [true, "please add user password"] },
  },
  { timestamp: true }
);
module.exports = mongoose.model("User", userSchema);
