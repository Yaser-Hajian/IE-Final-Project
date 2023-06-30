const User = require("../models/user");

const getStudents = async (studentsId) => {
  if (studentsId == null) {
    const students = await User.find({ userType: "student" });
    return students;
  }
  const students = await User.find({
    student_ID: { $in: studentsId },
  }).exec();
  return students;
};

module.exports = getStudents;
