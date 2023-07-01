const User = require("../models/user");

const getManagers = async () => {
  const managers = await User.find({ userType: "EducationManager" });
  return managers;
};

module.exports = getManagers;
