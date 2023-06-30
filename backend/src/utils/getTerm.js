const Term = require("../models/term");

const getTerm = async (termId) => {
  const term = await Term.findOne({ term_id: termId }).exec();
  return term;
};

module.exports = getTerm;
