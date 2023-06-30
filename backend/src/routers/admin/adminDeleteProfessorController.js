const deleteProfessor = require("../../utils/deleteProfessor");

const adminDeleteProfessorController = async (req, res) => {
  try {
    const { professorId } = req.params;

    await deleteProfessor(professorId);

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminDeleteProfessorController;
