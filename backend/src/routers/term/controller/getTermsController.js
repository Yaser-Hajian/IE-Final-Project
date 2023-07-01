const TermMapper = require("../../../mapper/termMapper");
const getProfessors = require("../../../utils/getProfessors");
const getStudents = require("../../../utils/getStudents");
const getTerms = require("../../../utils/getTerms");

const getTermsController = async (req, res) => {
  try {
    const search = req.query.search;
    const terms = await getTerms(search);

    const promise = terms.map(async (t) => {
      const students = await getStudents(t.students);
      const professors = await getProfessors(t.professors);
      return {
        ...t._doc,
        students,
        professors,
      };
    });
    const termsData = await Promise.all(promise);

    res
      .status(200)
      .json({
        error: false,
        data: { terms: TermMapper.toDtoBulk(termsData) },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getTermsController;
