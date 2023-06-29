const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");


const registrationSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  semester_course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SemesterCourse",
  },
});

registrationSchema.plugin(timestamps);
const Registration = mongoose.model("Registration",registrationSchema)

module.exports = Registration;
