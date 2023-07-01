const { SemesterCourse } = require("../models/semester_course");
const Term = require("../models/term");
const deletePreregisterCourseById = require("./deletePreregisterCourseById");

const deletePreregistrationCourse = async (termId, courseId) => {
  const sem = await SemesterCourse.findById(courseId);

  const promises = sem.registrations.map(async (r) => {
    return await deletePreregisterCourseById(r);
  });
  await Promise.all(promises);
  await SemesterCourse.findByIdAndDelete(courseId);
  await Term.findOneAndUpdate(
    { _id: termId },
    { $pull: { preregistration_courses: courseId } }
  );
};

module.exports = deletePreregistrationCourse;
