const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const preRegistrationSchema = mongoose.Schema({
  studentId: {
    type: Number,
  },
  termId: {
    type: Number,
  },
  courseId: {
    type: Number,
  },
  // semester_course: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "SemesterCourse",
  // },
  // term: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Term",
  // },
});

preRegistrationSchema.plugin(timestamps);
const PreRegistration = mongoose.model(
  "PreRegistration",
  preRegistrationSchema
);

module.exports = PreRegistration;
