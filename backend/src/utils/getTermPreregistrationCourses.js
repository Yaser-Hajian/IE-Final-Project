const SemCourseMapper = require("../mapper/semCourseMapper");
const getTerm = require("./getTerm");

const getTermPreregistrationCourses = async (termId) => {
  const preregistrationCourses = await getTerm(termId);
  return SemCourseMapper.toDtoBulk(
    preregistrationCourses.preregistration_courses
  );
};

module.exports = getTermPreregistrationCourses;
