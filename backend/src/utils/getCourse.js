const { SemesterCourse } = require("../models/semester_course");

const getCourse = async (courseId) => {
  const course = await SemesterCourse.findById(courseId).exec();
  return course;
};

module.exports = getCourse;
