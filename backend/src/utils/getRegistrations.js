const Registration = require("../models/registration");

const getRegistrations = async (termId, studentId) => {
  const registrations = await Registration.find({
    term_id: termId,
    student_id: studentId,
  }).exec();
  return registrations;
};

module.exports = getRegistrations;
