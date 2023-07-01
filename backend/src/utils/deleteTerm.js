const Term = require("../models/term");
const deletePreregistrationCourse = require("./deletePreregistrationCourse");
const deleteRegistrationCourse = require("./deleteRegistrationCourse");

const deleteTerm = async (termId) => {
  const term = await Term.findById(termId);
  const pre = term.preregistration_courses;
  const re = term.registration_courses;

  const promises = pre.map(async (p) => {
    return await deletePreregistrationCourse(term._id, p);
  });

  const promises2 = re.map(async (p) => {
    return await deleteRegistrationCourse(term._id, p);
  });

  await Promise.all(promises);
  await Promise.all(promises2);
  await Term.findByIdAndDelete(termId);
};

module.exports = deleteTerm;
