const PreRegistration = require("../models/pre_registration");

const deletePreregisterCourseById = async (preregisterId) => {
  await PreRegistration.findByIdAndDelete(preregisterId);
};

module.exports = deletePreregisterCourseById;
