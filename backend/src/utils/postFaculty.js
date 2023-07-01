const Faculty = require("../models/faculty");

const postFaculty = async (facultyData) => {
  await new Faculty({
    name: facultyData.name,
    majors: facultyData.majors,
  }).save();
};

module.exports = postFaculty;
