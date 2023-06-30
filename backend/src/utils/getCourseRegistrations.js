const StudentMapper = require("../mapper/studentMapper");
const Registration = require("../models/registration");
const { SemesterCourse } = require("../models/semester_course");
const getStudent = require("./getStudent");

const getCourseRegistrations = async (courseId) => {
  const course = await SemesterCourse.findById(courseId).exec();
  const registrationsId = course.registrations;
  const registrations = await Registration.find({
    _id: { $in: registrationsId },
  });
  const promises = registrations.map(async (p) => {
    const student = StudentMapper.toDto(await getStudent(p.studentId));
    return {
      ...p._doc,
      name: student.name,
      familyName: student.familyName,
      id: p._id,
    };
  });
  const re = await Promise.all(promises);
  return re;
};

module.exports = getCourseRegistrations;
