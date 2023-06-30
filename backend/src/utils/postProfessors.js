const { Professor } = require("../models/professor");

const postProfessors = async (professorsData) => {
  await Professor.insertMany(professorsData);
};

module.exports = postProfessors;
