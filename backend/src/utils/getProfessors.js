const User = require("../models/user");

const getProfessors = async (professorsId) => {
  const professors = await User.find({
    professor_ID: { $in: professorsId },
  }).exec();
  return professors;
};

module.exports = getProfessors;
