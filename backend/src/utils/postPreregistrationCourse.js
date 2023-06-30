const Term = require("../models/term");

const postPreregistrationCourse = async (termId, courseData) => {
  await Term.findOneAndUpdate(
    { term_id: termId },
    { $push: { preregistration_courses: courseData } }
  );
};

module.exports = postPreregistrationCourse;
