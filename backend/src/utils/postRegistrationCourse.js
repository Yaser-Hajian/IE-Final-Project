const { SemesterCourse } = require("../models/semester_course");
const Term = require("../models/term");

const postRegistrationCourse = async (termId, courseData) => {
  const course = await new SemesterCourse({
    ...courseData,
    term: termId,
  }).save();
  await Term.findOneAndUpdate(
    { _id: termId },
    { $push: { registration_courses: course._id } }
  );
};

module.exports = postRegistrationCourse;
