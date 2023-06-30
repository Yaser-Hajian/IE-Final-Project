const { EducationManager } = require("../models/education_manager");

const updateManager = async (managerId, managerData) => {
  await EducationManager.findByIdAndUpdate(managerId, { $set: managerData });
};

module.exports = updateManager;
