const ProfessorMapper = require("../../../mapper/professorMapper");
const updateProfessor = require("../../../utils/updateProfessor");

const adminUpdateProfessorController = async (req, res) => {
  try {
    const { professorId } = req.params;
    const professorData = req.body;
    await updateProfessor(
      professorId,
      ProfessorMapper.toPersistence(professorData)
    );

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminUpdateProfessorController;
