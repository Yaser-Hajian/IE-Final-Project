const acceptRegister = require("../../utils/acceptRegister");
const rejectRegister = require("../../utils/rejectRegister");

const acceptOrRejectRegistrationController = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { isPass } = req.body;
    if (isPass) {
      await acceptRegister(registrationId);
    } else {
      await rejectRegister(registrationId);
    }

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = acceptOrRejectRegistrationController;
