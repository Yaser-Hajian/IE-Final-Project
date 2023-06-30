const PreRegistration = require("../models/pre_registration");
const { SemesterCourse } = require("../models/semester_course");

const postPreregisterCourse = async (courseId, studentId) => {
  console.log(courseId, studentId);
  const isExist =
    (await PreRegistration.find({ courseId, studentId })).length != 0;
  if (isExist) throw new Error("user is preregister before");
  const semester = await SemesterCourse.findById(courseId);
  const preregistration = await new PreRegistration({
    courseId,
    studentId,
    isAccepted: null,
    termId: semester.term,
    date: new Date().getTime(),
  }).save();
  await SemesterCourse.findByIdAndUpdate(courseId, {
    $push: { registrations: preregistration._id },
  });
};

module.exports = postPreregisterCourse;
