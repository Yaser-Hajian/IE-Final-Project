const TermMapper = require("../../../mapper/termMapper");
const getTerm = require("../../../utils/getTerm");

const getTermByIdController = async (req, res) => {
  try {
    const { termId } = req.params;
    const term = await getTerm(termId);
    res
      .status(200)
      .json({ error: false, data: TermMapper.toDto(term) })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getTermByIdController;
