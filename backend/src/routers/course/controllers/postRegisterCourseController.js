const postRegisterCourse = require("../../../utils/postRegisterCourse");

const postRegisterCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id.toString();
    await postRegisterCourse(courseId, studentId);
    res
      .status(200)
      .json({
        error: false,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: error.message }).end();
  }
};

module.exports = postRegisterCourseController;
