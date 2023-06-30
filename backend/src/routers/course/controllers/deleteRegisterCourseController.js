const deleteRegister = require("../../../utils/deleteRegisterCourse");

const deleteRegisterCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id.toString();
    await deleteRegister(courseId, studentId);
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

module.exports = deleteRegisterCourseController;
