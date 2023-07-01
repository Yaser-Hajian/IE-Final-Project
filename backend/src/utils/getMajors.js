const Major = require("../models/major");

const getMajors = async () => {
  const majors = await Major.find().exec();
  return majors;
};

module.exports = getMajors;
