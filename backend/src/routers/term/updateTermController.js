const TermMapper = require("../../mapper/termMapper");
const getProfessors = require("../../utils/getProfessors");
const getStudents = require("../../utils/getStudents");
const updateTerm = require("../../utils/updateTerm");

const updateTermController = async (req, res) => {
  try {
    const termId = req.body.id;
    const students = await getStudents(req.body.students.map((s) => s.id));
    const professors = await getProfessors(
      req.body.professors.map((s) => s.id)
    );
    const termData = { ...req.body, students, professors };
    await updateTerm(termId, TermMapper.toPersistence(termData));
    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = updateTermController;
