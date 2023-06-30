const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getCourses = require("../../../utils/getCourses");

const getCoursesController = async (req, res) => {
  try {
    const search = req.query.search;
    const courses = await getCourses(search);
    res
      .status(200)
      .json({
        error: false,
        data: { courses: SemCourseMapper.toDtoBulk(courses) },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getCoursesController;
