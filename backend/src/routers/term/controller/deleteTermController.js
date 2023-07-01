const deleteTerm = require("../../../utils/deleteTerm");

const deleteTermController = async (req, res) => {
  try {
    const { termId } = req.params;
    await deleteTerm(termId);
    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = deleteTermController;
