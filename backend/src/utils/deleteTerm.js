const Term = require("../models/term");

const deleteTerm = async (termId) => {
  await Term.findByIdAndDelete(termId);
};

module.exports = deleteTerm;
