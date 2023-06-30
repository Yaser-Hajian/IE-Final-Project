const getPreregistrations = require("../../../utils/getPreregistrations");

const getPreregistrationsController = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { termId } = req.params;
    const preregistrations = await getPreregistrations(termId, studentId);
    res.status(200).json({ error: false, data: { preregistrations } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getPreregistrationsController;
