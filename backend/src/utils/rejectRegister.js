const Registration = require("../models/registration");

const rejectRegister = async (registerId) => {
  await Registration.findByIdAndUpdate(registerId, {
    $set: { isAccepted: "NO" },
  });
};

module.exports = rejectRegister;
