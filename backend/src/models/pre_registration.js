const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");


const preRegistrationSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  semester_course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SemesterCourse",
  },
});

preRegistrationSchema.plugin(timestamps);
const PreRegistration = mongoose.model("PreRegistration",preRegistrationSchema)

module.exports = PreRegistration;
