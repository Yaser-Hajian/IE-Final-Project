const { Professor } = require("../models/professor");

const getProfessor = async (professorId) => {
  const professor = await Professor.findById(professorId);
  return professor;
};

module.exports = getProfessor;
