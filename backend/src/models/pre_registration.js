const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const preRegistrationSchema = mongoose.Schema({
  student_id: {
    type: Number,
  },
  term_id: {
    type: Number,
  },
  course_id: {
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
