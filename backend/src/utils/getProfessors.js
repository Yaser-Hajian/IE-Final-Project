const { Professor } = require("../models/professor");

const getProfessors = async (professorsId) => {
  if (professorsId == null) {
    const professors = await Professor.find().exec();
    return professors;
  }
  const professors = await Professor.find({
    _id: { $in: professorsId },
  }).exec();
  return professors;
};

module.exports = getProfessors;
