const PreregistrationMapper = require("../../../mapper/preregistrationMapper");
const getCoursePreregistrations = require("../../../utils/getCoursePreregistrations");

const getCoursePreregistrationsController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const preregistrations = await getCoursePreregistrations(courseId);
    res
      .status(200)
      .json({
        error: false,
        data: {
          preregistrations: PreregistrationMapper.toDtoBulk(preregistrations),
        },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getCoursePreregistrationsController;
