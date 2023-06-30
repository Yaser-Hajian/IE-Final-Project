const Term = require("../models/term");

const updateTerm = async (termId, termData) => {
  console.log(termData, termId);
  await Term.findOneAndUpdate({ term_id: termId }, termData);
};

module.exports = updateTerm;
