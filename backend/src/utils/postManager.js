const { EducationManager } = require("../models/education_manager");

const postManager = async (managerData) => {
  await new EducationManager(managerData).save();
};

module.exports = postManager;
