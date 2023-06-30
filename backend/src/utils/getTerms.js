const Term = require("../models/term");

const getTerms = async (search) => {
  let terms = [];
  if (search == null) {
    terms = await Term.find().exec();
    return terms;
  }
  const termIDs = search.split(",");
  terms = await Term.find({ term_id: { $in: termIDs } }).exec();

  return terms;
};

module.exports = getTerms;
