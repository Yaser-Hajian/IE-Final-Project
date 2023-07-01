const SemCourseMapper = require("../mapper/semCourseMapper");
const { SemesterCourse } = require("../models/semester_course");
const getTerm = require("./getTerm");

const getTermPreregistrationCourses = async (termId) => {
  const term = await getTerm(termId);
  const semList = term.preregistration_courses;
  const semestersCourses = await SemesterCourse.find({ _id: { $in: semList } });
  term.preregistration_courses = semestersCourses;
  return SemCourseMapper.toDtoBulk(term.preregistration_courses);
};

module.exports = getTermPreregistrationCourses;
