const ProfessorMapper = require("../../../mapper/professorMapper");
const postProfessor = require("../../../utils/postProfessor");

const adminPostProfessorController = async (req, res) => {
  try {
    console.log(req.body);
    const professor = req.body;

    await postProfessor(ProfessorMapper.toPersistence(professor));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostProfessorController;
