// const { v4 } = require("uuid");
const Term = require("../models/term");
const generateUniqueTermId = async () => {
  const termId = (await Term.find().exec()).length + 1;
  return termId;
  // return v4();
};

module.exports = generateUniqueTermId;
