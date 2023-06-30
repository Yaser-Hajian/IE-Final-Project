const User = require("../models/user");

const getProfessor = async (professorId) => {
  const professor = await User.findOne({ professor_ID: professorId });
  return professor;
};

module.exports = getProfessor;
