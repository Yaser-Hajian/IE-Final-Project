const Student = require("../models/student");

const postStudents = async (students) => {
  await Student.insertMany(students);
};

module.exports = postStudents;
