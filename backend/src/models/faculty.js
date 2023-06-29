const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const facultySchema = mongoose.Schema({
  name: {
    type: String,
  },
  majors:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Major",
  }
});

facultySchema.plugin(timestamps);
const Faculty = mongoose.model("Faculty",facultySchema)

module.exports = Faculty;
