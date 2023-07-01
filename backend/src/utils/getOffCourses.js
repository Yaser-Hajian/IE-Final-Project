const { OfficialCourse } = require("../models/official_course");

const getOffCourses = async () => {
  courses = await OfficialCourse.find().exec();
  return courses;
};

module.exports = getOffCourses;
