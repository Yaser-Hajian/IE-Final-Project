const PreRegistration = require("../models/pre_registration");

const getPreregistrations = async (termId, studentId) => {
  const preregistrations = await PreRegistration.find({
    term_id: termId,
    student_id: studentId,
  }).exec();
  return preregistrations;
};

module.exports = getPreregistrations;
