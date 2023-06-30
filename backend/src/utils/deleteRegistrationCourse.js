const { SemesterCourse } = require("../models/semester_course");
const Term = require("../models/term");

const deleteRegistrationCourse = async (termId, courseId) => {
  await SemesterCourse.findByIdAndDelete(courseId);
  await Term.findOneAndUpdate(
    { _id: termId },
    { $pull: { registration_courses: courseId } }
  );
};

module.exports = deleteRegistrationCourse;
