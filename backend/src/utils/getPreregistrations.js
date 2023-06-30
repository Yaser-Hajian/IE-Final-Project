const StudentMapper = require("../mapper/studentMapper");
const PreRegistration = require("../models/pre_registration");
const getStudent = require("./getStudent");

const getPreregistrations = async (termId, studentId) => {
  const preregistrations = await PreRegistration.find({
    termId,
    studentId,
  });
  const promises = preregistrations.map(async (p) => {
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

module.exports = getPreregistrations;
