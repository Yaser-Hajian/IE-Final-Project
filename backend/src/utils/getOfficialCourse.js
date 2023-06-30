const { OfficialCourse } = require("../models/official_course");

const getOfficialCourse = async (courseId) => {
  const course = await OfficialCourse.findById(courseId).exec();
  return course;
};

module.exports = getOfficialCourse;
