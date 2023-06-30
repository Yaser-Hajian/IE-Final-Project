const Term = require("../models/term");

const deletePreregistrationCourse = async (termId, courseId) => {
  await Term.findOneAndUpdate(
    { term_id: termId },
    { $pull: { preregistration_courses: { course_id: courseId } } }
  );
};

module.exports = deletePreregistrationCourse;
