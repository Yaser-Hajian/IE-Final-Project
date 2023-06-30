const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const registrationSchema = mongoose.Schema({
  courseId: {
    type: String,
  },
  studentId: {
    type: String,
  },
  termId: {
    type: String,
  },
  isAccepted: {
    type: String,
  },
});

registrationSchema.plugin(timestamps);
const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
