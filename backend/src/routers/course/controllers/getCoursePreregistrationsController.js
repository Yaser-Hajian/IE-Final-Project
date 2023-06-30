const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getCourseRegistrations = require("../../../utils/getCourseRegistrations");

const getCoursePreregistrationsController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const preregistrations = await getCourseRegistrations(courseId);
    res
      .status(200)
      .json({
        error: false,
        data: { preregistrations: SemCourseMapper.toDto(preregistrations) },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getCoursePreregistrationsController;
