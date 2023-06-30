const Faculty = require("../models/faculty");

const postFaculty = async (facultyData) => {
  await new Faculty(facultyData).save();
};

module.exports = postFaculty;
