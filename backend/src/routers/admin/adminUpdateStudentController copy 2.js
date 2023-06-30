const StudentMapper = require("../../mapper/studentMapper");
const updateStudent = require("../../utils/updateStudent");

const adminUpdateStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = req.body;

    await updateStudent(studentId, StudentMapper.toPersistence(student));

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminUpdateStudentController;
