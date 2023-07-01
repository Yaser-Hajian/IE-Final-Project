const ProfessorMapper = require("../../../mapper/professorMapper");
const postProfessors = require("../../../utils/postProfessors");

const adminPostProfessorsController = async (req, res) => {
  try {
    const { professors } = req.body;

    await postProfessors(ProfessorMapper.toPersistenceBulk(professors));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostProfessorsController;
