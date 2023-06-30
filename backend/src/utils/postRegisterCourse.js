const Registration = require("../models/registration");
const { SemesterCourse } = require("../models/semester_course");

const postRegisterCourse = async (courseId, studentId) => {
  const isExist =
    (await Registration.find({ courseId, studentId })).length != 0;
  if (isExist) throw new Error("user is register before");
  const semester = await SemesterCourse.findById(courseId);
  const registration = await new Registration({
    courseId,
    studentId,
    termId: semester.term,
    isAccepted: null,
  }).save();
  await SemesterCourse.findByIdAndUpdate(courseId, {
    $push: { registrations: registration._id },
  });
};

module.exports = postRegisterCourse;
