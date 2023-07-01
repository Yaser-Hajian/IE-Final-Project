const { EducationManager } = require("../models/education_manager");

const deleteManager = async (managerId) => {
  await EducationManager.findByIdAndDelete(managerId);
};

module.exports = deleteManager;
