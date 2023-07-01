const { Professor } = require("../models/professor");

const postProfessor = async (professorData) => {
  await new Professor(professorData).save();
};

module.exports = postProfessor;
