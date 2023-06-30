const TermMapper = require("../../../mapper/termMapper");
const getTerms = require("../../../utils/getTerms");

const getTermsController = async (req, res) => {
  try {
    const search = req.query.search;
    const terms = await getTerms(search);
    res
      .status(200)
      .json({
        error: false,
        data: { terms: TermMapper.toDtoBulk(terms) },
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal Error." }).end();
  }
};

module.exports = getTermsController;
