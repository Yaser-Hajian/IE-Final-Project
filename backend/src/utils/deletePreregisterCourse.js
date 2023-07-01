const PreRegistration = require("../models/pre_registration");
const { SemesterCourse } = require("../models/semester_course");

const deletePreregisterCourse = async (courseId, studentId) => {
  const preregistration = await PreRegistration.findOneAndDelete({
    courseId,
    studentId,
  });
  await SemesterCourse.findByIdAndUpdate(courseId, {
    $pull: { registrations: preregistration._id },
  });
};

module.exports = deletePreregisterCourse;
