const StudentMapper = require("../mapper/studentMapper");
const Registration = require("../models/registration");
const getStudent = require("./getStudent");

const getRegistrations = async (termId, studentId) => {
  const registrations = await Registration.find({
    termId,
    studentId,
  });
  const promises = registrations.map(async (p) => {
    const student = StudentMapper.toDto(await getStudent(p.studentId));
    return {
      ...p._doc,
      name: student.name,
      familyName: student.familyName,
      id: p._id,
    };
  });
  const pre = await Promise.all(promises);
  return pre;
};

module.exports = getRegistrations;
