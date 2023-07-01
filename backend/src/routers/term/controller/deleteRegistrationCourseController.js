const deleteRegistrationCourse = require("../../../utils/deleteRegistrationCourse");
const deleteRegistrationCourseController = async (req, res) => {
  try {
    const { termId } = req.params;
    const { courseId } = req.body;
    await deleteRegistrationCourse(termId, courseId);
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

module.exports = deleteRegistrationCourseController;
