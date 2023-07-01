const Term = require("../models/term");

const postTerm = async (termData) => {
  await Term(termData).save();
};

module.exports = postTerm;
