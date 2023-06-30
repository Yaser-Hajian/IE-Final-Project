const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getCourseRegistrations = require("../../../utils/getCourseRegistrations");

const getCourseRegistrationsController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const registrations = await getCourseRegistrations(courseId);
    res
      .status(200)
      .json({
        error: false,
        data: { registrations: SemCourseMapper.toDto(registrations) },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getCourseRegistrationsController;
