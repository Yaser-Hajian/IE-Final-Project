const { OfficialCourse } = require("../models/official_course");

const getOfficialCourse = async (courseId) => {
  const course = await OfficialCourse.findOne({ course_id: courseId });
  return course;
};

module.exports = getOfficialCourse;
