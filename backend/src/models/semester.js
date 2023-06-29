const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Student = require("./student");
const { Professor } = require("./professor");
const { SemesterCourse } = require("./semester_course");

const semesterSchema = mongoose.Schema({
  semester_id: {
    type : Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: []
  },
  professors: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    default:[]
  },
  semester_courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SemesterCourse",
    default : []
  },
});

semesterSchema.plugin(timestamps);
const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;
