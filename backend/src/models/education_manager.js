const mongoose = require("mongoose");
const User = require("./user");
const timestamps = require("mongoose-timestamp");

const educationManagerSchema = mongoose.Schema({
  employee_ID: {
    type: Number,
    required: true,
    unique : true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  major:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Major",
    required: true,
  }
});
educationManagerSchema.plugin(timestamps);

const EducationManager = User.discriminator(
  "EducationManager",
  educationManagerSchema
);

module.exports = {
  educationManagerSchema,
  EducationManager,
};
