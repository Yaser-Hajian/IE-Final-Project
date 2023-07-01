const deletePreregisterCourse = require("../../../utils/deletePreregisterCourse");

const deletePreregisterCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id.toString();
    await deletePreregisterCourse(courseId, studentId);
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

module.exports = deletePreregisterCourseController;
