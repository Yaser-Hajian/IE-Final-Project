const SemCourseMapper = require("../mapper/semCourseMapper");
const StudentMapper = require("../mapper/studentMapper");
const Registration = require("../models/registration");
const { SemesterCourse } = require("../models/semester_course");

const getRegistrations = async (termId, studentId) => {
  const registrations = await Registration.find({
    termId,
    studentId,
  });
  const ids = registrations.map((p) => p.courseId);
  const sems = await SemesterCourse.find({ _id: { $in: ids } });
  return SemCourseMapper.toDtoBulk(sems);
};

module.exports = getRegistrations;
