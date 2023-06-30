const ProfessorMapper = require("../../../mapper/professorMapper");
const StudentMapper = require("../../../mapper/studentMapper");
const getProfessor = require("../../../utils/getProfessor");
const getStudent = require("../../../utils/getStudent");
const adminGetStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await getStudent(studentId);
    const professor = await getProfessor(student.supervisor);
    student.supervisor = ProfessorMapper.toDto(professor);

    res
      .status(200)
      .json({ error: false, data: StudentMapper.toDto(student) })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetStudentController;
