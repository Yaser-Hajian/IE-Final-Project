const deleteStudent = require("../../../utils/deleteStudent");

const adminDeleteStudentController = async (req, res) => {
  try {
    const { studentId } = req.params;

    await deleteStudent(studentId);

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminDeleteStudentController;
