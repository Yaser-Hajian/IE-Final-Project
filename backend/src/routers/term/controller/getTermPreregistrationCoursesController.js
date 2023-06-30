const getTermPreregistrationCourses = require("../../../utils/getTermPreregistrationCourses");

const getTermPreregistrationCoursesController = async (req, res) => {
  try {
    const { termId } = req.params;

    const preregistrationCourses = await getTermPreregistrationCourses(termId);
    res.status(200).json({
      error: false,
      data: { preregistrationCourses },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getTermPreregistrationCoursesController;
