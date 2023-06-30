const Student = require("../models/student");

const postStudent = async (studentData) => {
  await new Student(studentData).save();
};

module.exports = postStudent;
