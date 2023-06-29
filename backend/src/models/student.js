const User = require("./user");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { Professor } = require("./professor");
const studentSchema = mongoose.Schema({
  education_level: {
    type: String,
    enum: ["Bachelor", "Master", "PhD"],
    required: true,
  },
  student_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  entrance_semester: {
    type: Number,
    required: true,
  },
  average_score: {
    type: Number,
    default: null,
    // required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  major: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Major",
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
  },
});

studentSchema.plugin(timestamps);
const Student = User.discriminator("Student", studentSchema);

module.exports = Student;
