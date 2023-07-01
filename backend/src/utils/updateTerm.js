const Term = require("../models/term");

const updateTerm = async (termId, termData) => {
  await Term.findByIdAndUpdate(termId, termData);
};

module.exports = updateTerm;
