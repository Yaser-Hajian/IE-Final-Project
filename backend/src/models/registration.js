const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const registrationSchema = mongoose.Schema({
  semester_course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterCourse",
    },
  ],
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
  },
});

registrationSchema.plugin(timestamps);
const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
