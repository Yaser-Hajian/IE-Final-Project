const User = require("../models/user");

const getManager = async (managerId) => {
  const manager = await User.findById(managerId);
  return manager;
};

module.exports = getManager;
