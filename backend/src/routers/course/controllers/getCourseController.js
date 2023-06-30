const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getCourse = require("../../../utils/getCourse");

const getCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await getCourse(courseId);
    res
      .status(200)
      .json({
        error: false,
        data: SemCourseMapper.toDto(course),
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getCourseController;
