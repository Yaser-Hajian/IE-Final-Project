const Term = require("../models/term");

const deleteTerm = async (termId) => {
  await Term.deleteOne({ term_id: termId });
};

module.exports = deleteTerm;
