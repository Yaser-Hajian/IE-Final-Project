const getRegistrations = require("../../utils/getRegistrations");

const getRegistrationsController = async (req, res) => {
  try {
    const studentId = req.user.student_ID;
    const { termId } = req.params;
    const registrations = await getRegistrations(Number(termId), studentId);
    res.status(200).json({ error: false, data: { registrations } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getRegistrationsController;
