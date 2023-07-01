const Faculty = require("../models/faculty");

const getFaculties = async () => {
  const faculties = await Faculty.find().exec();
  return faculties;
};

module.exports = getFaculties;
