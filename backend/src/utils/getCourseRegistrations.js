const { SemesterCourse } = require("../models/semester_course");

const getCourseRegistrations = async (courseId) => {
  const course = await SemesterCourse.findById(courseId).exec();
  return course;
};

module.exports = getCourseRegistrations;
