const { SemesterCourse } = require("../models/semester_course");
const Term = require("../models/term");

const deletePreregistrationCourse = async (termId, courseId) => {
  await SemesterCourse.findByIdAndDelete(courseId);
  await Term.findOneAndUpdate(
    { _id: termId },
    { $pull: { preregistration_courses: courseId } }
  );
};

module.exports = deletePreregistrationCourse;
