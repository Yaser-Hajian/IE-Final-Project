const ProfessorMapper = require("../../../mapper/professorMapper");
const getProfessors = require("../../../utils/getProfessors");

const adminGetProfessorsController = async (req, res) => {
  try {
    const professors = ProfessorMapper.toDtoBulk(await getProfessors());

    res.status(200).json({ error: false, data: { professors } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetProfessorsController;
