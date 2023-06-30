const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getOfficialCourse = require("../../../utils/getOfficialCourse");
const getProfessor = require("../../../utils/getProfessor");
const postPreregistrationCourse = require("../../../utils/postPreregistrationCourse");

const postPreregistrationCourseController = async (req, res) => {
  try {
    const { termId } = req.params;
    const courseData = req.body;
    const professor = await getProfessor(courseData.professor.id);
    await postPreregistrationCourse(
      termId,
      SemCourseMapper.toPersistence({
        ...courseData,
        name: courseData.course.name,
        courseId: courseData.course.id,
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

module.exports = postPreregistrationCourseController;
