const { SemesterCourse } = require("../models/semester_course");

const getCourses = async (search) => {
  let courses = [];
  if (search == null) {
    courses = await SemesterCourse.find().exec();
    return courses;
  }
  const courseIDs = search.split(",");
  courses = await SemesterCourse.find({ course_id: { $in: courseIDs } }).exec();

  return courses;
};

module.exports = getCourses;
