const Student = require("../models/student");

const deleteStudent = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};

module.exports = deleteStudent;
