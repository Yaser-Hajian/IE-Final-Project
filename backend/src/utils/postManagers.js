const { EducationManager } = require("../models/education_manager");

const postManagers = async (managersData) => {
  await EducationManager.insertMany(managersData);
};

module.exports = postManagers;
