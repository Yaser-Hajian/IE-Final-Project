const TermMapper = require("../../mapper/termMapper");
const generateUniqueTermId = require("../../utils/generateUniqueTermId");
const getProfessors = require("../../utils/getProfessors");
const getStudents = require("../../utils/getStudents");
const postTerm = require("../../utils/postTerm");

const postTermController = async (req, res) => {
  try {
    const termId = await generateUniqueTermId();
    const students = await getStudents(req.body.students.map((s) => s.id));
    const professors = await getProfessors(
      req.body.professors.map((s) => s.id)
    );
    const termData = { ...req.body, students, professors, termId };
    await postTerm(TermMapper.toPersistence(termData));
    res.status(201).json({ error: false }).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Error" }).end();
  }
};

module.exports = postTermController;
