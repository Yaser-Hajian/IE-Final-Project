const { Professor } = require("../models/professor");

const updateProfessor = async (professorId, professorData) => {
  await Professor.findByIdAndUpdate(professorId, { $set: professorData });
};

module.exports = updateProfessor;
