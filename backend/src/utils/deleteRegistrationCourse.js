const { SemesterCourse } = require("../models/semester_course");
const Term = require("../models/term");
const deleteRegisterCourseById = require("./deleteRegisterCourseById");

const deleteRegistrationCourse = async (termId, courseId) => {
  const sem = await SemesterCourse.findById(courseId);

  const promises = sem.registrations.map(async (r) => {
    return await deleteRegisterCourseById(r);
  });
  await Promise.all(promises);
  await SemesterCourse.findByIdAndDelete(courseId);
  await Term.findOneAndUpdate(
    { _id: termId },
    { $pull: { registration_courses: courseId } }
  );
};

module.exports = deleteRegistrationCourse;
