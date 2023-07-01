const Registration = require("../models/registration");

const acceptRegister = async (registerId) => {
  await Registration.findByIdAndUpdate(registerId, {
    $set: { isAccepted: "YES" },
  });
};

module.exports = acceptRegister;
