const User = require("../models/user");

const getProfessors = async (professorsId) => {
  if (professorsId == null) {
    const professors = await User.find({ userType: "professor" }).exec();
    return professors;
  }
  const professors = await User.find({
    professor_ID: { $in: professorsId },
  }).exec();
  return professors;
};

module.exports = getProfessors;
