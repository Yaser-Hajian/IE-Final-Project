const mongoose = require("mongoose");
const { officialCourse } = require("./official_course");
const timestamps = require("mongoose-timestamp");
const { Professor } = require("./professor");

const semesterCourseSchema = mongoose.Schema({
  course_id: {
    type: Number,
    required: true,
    unique: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  // major: {
  //   type: String,
  //   required: true,
  // },

  class_times: {
    type: Array,
    items: {
      type: Object,
    },
  },
  exam_time: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  registrations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
  },
});

semesterCourseSchema.plugin(timestamps);
const SemesterCourse = mongoose.model("SemesterCourse", semesterCourseSchema);
module.exports = {
  semesterCourseSchema,
  SemesterCourse,
};
