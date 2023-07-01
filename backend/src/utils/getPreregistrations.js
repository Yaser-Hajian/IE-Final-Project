const SemCourseMapper = require("../mapper/semCourseMapper");
const PreRegistration = require("../models/pre_registration");
const { SemesterCourse } = require("../models/semester_course");

const getPreregistrations = async (termId, studentId) => {
  const preregistrations = await PreRegistration.find({
    termId,
    studentId,
  });
  const ids = preregistrations.map((p) => p.courseId);
  const sems = await SemesterCourse.find({ _id: { $in: ids } });
  return SemCourseMapper.toDtoBulk(sems);
};

module.exports = getPreregistrations;
