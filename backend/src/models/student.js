const User = require("./user");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { Professor } = require("./professor");
const studentSchema = mongoose.Schema({
  student_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  entrance_year: {
    type: Number,
    required: true,
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
