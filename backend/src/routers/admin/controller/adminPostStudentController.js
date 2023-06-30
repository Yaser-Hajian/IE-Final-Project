const StudentMapper = require("../../../mapper/studentMapper");
const getProfessor = require("../../../utils/getProfessor");
const postStudent = require("../../../utils/postStudent");

const adminPostStudentController = async (req, res) => {
  try {
    const student = req.body;
    const professor = await getProfessor(student.professor.id);
    student.professor = professor;
    // const faculty = await getFac
    await postStudent(StudentMapper.toPersistence(student));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostStudentController;
