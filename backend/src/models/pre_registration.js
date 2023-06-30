const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const preRegistrationSchema = mongoose.Schema({
  courseId: {
    type: String,
  },
  studentId: {
    type: String,
  },
  termId: {
    type: String,
  },
  isAccepted: {
    type: String,
  },
  date: {
    type: Number,
  },
});

preRegistrationSchema.plugin(timestamps);
const PreRegistration = mongoose.model(
  "PreRegistration",
  preRegistrationSchema
);

module.exports = PreRegistration;
