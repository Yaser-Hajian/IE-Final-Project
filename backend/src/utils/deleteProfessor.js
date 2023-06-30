const { Professor } = require("../models/professor");

const deleteProfessor = async (professorId) => {
  await Professor.findByIdAndDelete(professorId);
};

module.exports = deleteProfessor;
