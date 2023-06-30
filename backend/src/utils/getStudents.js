const User = require("../models/user");

const getStudents = async (studentsId) => {
  const students = await User.find({
    student_ID: { $in: studentsId },
  }).exec();
  return students;
};

module.exports = getStudents;
