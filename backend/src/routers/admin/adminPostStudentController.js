const StudentMapper = require("../../mapper/studentMapper");
const postStudent = require("../../utils/postStudent");

const adminPostStudentController = async (req, res) => {
  try {
    const student = req.body;

    await postStudent(StudentMapper.toPersistence(student));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostStudentController;
