const { SemesterCourse } = require("../models/semester_course");
const Term = require("../models/term");

const postPreregistrationCourse = async (termId, courseData) => {
  const course = await new SemesterCourse({
    ...courseData,
    term: termId,
  }).save();
  await Term.findOneAndUpdate(
    { _id: termId },
    { $push: { preregistration_courses: course._id } }
  );
};

module.exports = postPreregistrationCourse;
