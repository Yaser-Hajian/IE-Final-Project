const OffCourseMapper = require("../../../mapper/offCourseMapper");
const SemCourseMapper = require("../../../mapper/semCourseMapper");
const getCourses = require("../../../utils/getCourses");
const getOffCourses = require("../../../utils/getOffCourses");

const getCoursesController = async (req, res) => {
  try {
    const search = req.query.search;
    let courses = [];
    if (search == null || search == "") {
      courses = OffCourseMapper.toDtoBulk(await getOffCourses());
    } else {
      courses = SemCourseMapper.toDtoBulk(await getCourses(search));
    }
    res
      .status(200)
      .json({
        error: false,
        data: { courses },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getCoursesController;
