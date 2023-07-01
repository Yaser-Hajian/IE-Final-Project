const ProfessorMapper = require("../../../mapper/professorMapper");
const getProfessor = require("../../../utils/getProfessor");

const adminGetProfessorController = async (req, res) => {
  try {
    const { professorId } = req.params;
    const professor = ProfessorMapper.toDto(await getProfessor(professorId));

    res.status(200).json({ error: false, data: professor }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetProfessorController;
