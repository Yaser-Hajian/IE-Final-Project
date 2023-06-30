const { Professor } = require("../models/professor");

const getProfessors = async (professorsId) => {
  if (professorsId == null) {
    const professors = await Professor.find({ userType: "professor" }).exec();
    return professors;
  }
  const professors = await Professor.find({
    professor_ID: { $in: professorsId },
  }).exec();
  return professors;
};

module.exports = getProfessors;
