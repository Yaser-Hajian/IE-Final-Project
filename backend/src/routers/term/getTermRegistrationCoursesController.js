const getTermRegistrationCourses = require("../../utils/getTermRegistrationCourses");

const getTermRegistrationCoursesController = async (req, res) => {
  try {
    const { termId } = req.params;

    const registrationCourses = await getTermRegistrationCourses(
      Number(termId)
    );
    res.status(200).json({ error: false, data: { registrationCourses } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getTermRegistrationCoursesController;
