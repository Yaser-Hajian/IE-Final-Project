const StudentMapper = require("../../../mapper/studentMapper");
const getStudent = require("../../../utils/getStudent");
const adminGetStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = StudentMapper.toDto(await getStudent(studentId));

    res.status(200).json({ error: false, data: student }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetStudentController;
