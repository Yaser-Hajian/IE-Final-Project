const Student = require("../models/student");

const updateStudent = async (studentId, studentData) => {
  await Student.findByIdAndUpdate(studentId, { $set: studentData });
};

module.exports = updateStudent;
