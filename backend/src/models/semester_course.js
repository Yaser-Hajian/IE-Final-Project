const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const semesterCourseSchema = mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },

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
    type: String,
  },
});

semesterCourseSchema.plugin(timestamps);
const SemesterCourse = mongoose.model("SemesterCourse", semesterCourseSchema);
module.exports = {
  semesterCourseSchema,
  SemesterCourse,
};
