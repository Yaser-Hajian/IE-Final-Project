const mongoose = require("mongoose");
const User = require("./user");
const timestamps = require("mongoose-timestamp");

const educationManagerSchema = mongoose.Schema({
  employee_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  faculty: {
    type: Object,
    required: true,
  },
  major: {
    type: Object,
    required: true,
  },
  skill: {
    type: String,
  },
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
