const Term = require("../models/term");

const deleteRegistrationCourse = async (termId, courseId) => {
  await Term.findOneAndUpdate(
    { term_id: termId },
    { $pull: { registration_courses: { course_id: courseId } } }
  );
};

module.exports = deleteRegistrationCourse;
