const FacultyMapper = require("../../mapper/facultyMapper");
const postFaculty = require("../../utils/postFaculty");

const adminPostFacultyController = async (req, res) => {
  try {
    const facultyData = req.body;
    await postFaculty(FacultyMapper.toPersistence(facultyData));

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostFacultyController;
