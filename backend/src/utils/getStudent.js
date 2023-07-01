const User = require("../models/user");

const getStudent = async (studentId) => {
  const student = await User.findById(studentId).exec();
  return student;
};

module.exports = getStudent;
