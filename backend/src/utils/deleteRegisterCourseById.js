const Registration = require("../models/registration");

const deleteRegisterCourseById = async (registerId) => {
  await Registration.findByIdAndDelete(registerId);
};

module.exports = deleteRegisterCourseById;
