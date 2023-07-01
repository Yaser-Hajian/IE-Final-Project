const StudentMapper = require("../mapper/studentMapper");
const PreRegistration = require("../models/pre_registration");
const { SemesterCourse } = require("../models/semester_course");
const getStudent = require("./getStudent");

const getCoursePreregistrations = async (courseId) => {
  const course = await SemesterCourse.findById(courseId).exec();
  const preregistrationsId = course.registrations;
  const preregistrations = await PreRegistration.find({
    _id: { $in: preregistrationsId },
  });
  const promises = preregistrations.map(async (p) => {
    const student = StudentMapper.toDto(await getStudent(p.studentId));
    return {
      ...p._doc,
      name: student.name,
      familyName: student.familyName,
      id: p._id,
    };
  });
  const pre = await Promise.all(promises);
  return pre;
};

module.exports = getCoursePreregistrations;
