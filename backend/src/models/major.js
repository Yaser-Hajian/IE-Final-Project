const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const majorSchema = mongoose.Schema({
  name: {
    type: String,
  }
});

majorSchema.plugin(timestamps);
const Major = mongoose.model("Major",majorSchema)

module.exports = Major;
