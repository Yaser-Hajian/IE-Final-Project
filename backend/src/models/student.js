const User = require("./user");
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
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
    type: Object,
  },
  major: {
    type: Object,
  },
  passed_courses: [
    {
      type: Object,
    },
  ],
  supervisor: {
    type: Object,
    ref: "Professor",
  },
});

studentSchema.plugin(timestamps);
const Student = User.discriminator("Student", studentSchema);

module.exports = Student;
