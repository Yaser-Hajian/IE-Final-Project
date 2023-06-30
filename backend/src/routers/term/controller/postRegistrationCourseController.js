const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getOfficialCourse = require("../../../utils/getOfficialCourse");
const getProfessor = require("../../../utils/getProfessor");
const postRegistrationCourse = require("../../../utils/postRegistrationCourse");

const postRegistrationCourseController = async (req, res) => {
  try {
    const { termId } = req.params;
    const courseData = req.body;
    const course = await getOfficialCourse(courseData.course.id);
    const professor = await getProfessor(courseData.professor.id);
    await postRegistrationCourse(
      termId,
      SemCourseMapper.toPersistence({
        ...courseData,
        name: course.course_name,
        courseId: course._id,
        professor: `${professor.first_name} ${professor.last_name}`,
      })
    );

    res
      .status(200)
      .json({
        error: false,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = postRegistrationCourseController;
