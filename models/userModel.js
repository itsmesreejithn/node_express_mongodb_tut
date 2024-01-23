const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    validate: validator.isEmail,
  },
  photo: String,
  password: {
    type: String,
    validate: validator.isStrongPassword,
  },
});
