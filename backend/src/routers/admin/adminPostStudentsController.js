const StudentMapper = require("../../mapper/studentMapper");
const postStudents = require("../../utils/postStudents");

const adminPostStudentsController = async (req, res) => {
  try {
    const { students } = req.body;

    await postStudents(StudentMapper.toPersistenceBulk(students));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostStudentsController;
