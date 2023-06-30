const Registration = require("../models/registration");
const { SemesterCourse } = require("../models/semester_course");

const deleteRegisterCourse = async (courseId, studentId) => {
  const registration = await Registration.findOneAndDelete({
    courseId,
    studentId,
  });
  await SemesterCourse.findByIdAndUpdate(courseId, {
    $pull: { registrations: registration._id },
  });
};

module.exports = deleteRegisterCourse;
