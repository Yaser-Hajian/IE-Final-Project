const professorMapper = require("../../../mapper/professorMapper");
const getProfessors = require("../../../utils/getProfessors");

const getProfessorsController = async (req, res) => {
  try {
    const professors = professorMapper.toDtoBulk(await getProfessors());
    res.status(200).json({ error: false, data: { professors } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getProfessorsController;
