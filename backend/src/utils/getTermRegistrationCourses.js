const SemCourseMapper = require("../mapper/semCourseMapper");
const getTerm = require("./getTerm");

const getTermRegistrationCourses = async (termId) => {
  const registrationCourses = await getTerm(termId);
  return SemCourseMapper.toDtoBulk(registrationCourses.registration_courses);
};

module.exports = getTermRegistrationCourses;
