const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: String,
      length: 11,
    },
    national_ID: {
      type: String,
      require: true,
      unique: true,
    },
    entrance_year: {
      type: Number,
      required: true,
    },
  },
  {
    discriminatorKey: "userType",
  }
);
userSchema.plugin(timestamps);
const User = mongoose.model("User", userSchema);
module.exports = User;
