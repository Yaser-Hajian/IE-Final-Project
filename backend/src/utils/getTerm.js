const Term = require("../models/term");

const getTerm = async (termId) => {
  const term = await Term.findById(termId);
  return term;
};

module.exports = getTerm;
