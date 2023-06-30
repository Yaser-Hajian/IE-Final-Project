const Term = require("../models/term");

const postRegistrationCourse = async (termId, courseData) => {
  await Term.findOneAndUpdate(
    { term_id: termId },
    { $push: { registration_courses: courseData } }
  );
};

module.exports = postRegistrationCourse;
