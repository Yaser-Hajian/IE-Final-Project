const SemCourseMapper = require("../mapper/semCourseMapper");
const { SemesterCourse } = require("../models/semester_course");
const getTerm = require("./getTerm");

const getTermRegistrationCourses = async (termId) => {
  const term = await getTerm(termId);
  const semList = term.registration_courses;
  const semestersCourses = await SemesterCourse.find({ _id: { $in: semList } });
  term.registration_courses = semestersCourses;
  return SemCourseMapper.toDtoBulk(term.registration_courses);
};

module.exports = getTermRegistrationCourses;
