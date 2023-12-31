const Student = require("../models/student");
const User = require("../models/user");

const getStudents = async (studentsId) => {
  if (studentsId == null) {
    const students = await Student.find({ userType: "student" });
    return students;
  }
  const students = await User.find({
    _id: { $in: studentsId },
  }).exec();
  return students;
};

module.exports = getStudents;
