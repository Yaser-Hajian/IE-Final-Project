const PreregistrationMapper = require("../../../mapper/preregistrationMapper");
const getRegistrations = require("../../../utils/getRegistrations");

const getRegistrationsController = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { termId } = req.params;
    const registrations = PreregistrationMapper.toDtoBulk(
      await getRegistrations(termId, studentId)
    );
    res.status(200).json({ error: false, data: { registrations } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getRegistrationsController;
