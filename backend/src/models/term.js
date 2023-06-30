const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const termSchema = mongoose.Schema({
  term_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Number,
    required: true,
  },
  end_date: {
    type: Number,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  professors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
  ],
  preregistration_courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterCourse",
    },
  ],
  registration_courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterCourse",
    },
  ],
});

termSchema.plugin(timestamps);
const Term = mongoose.model("Term", termSchema);

module.exports = Term;
