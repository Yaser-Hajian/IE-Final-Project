const StudentMapper = require("../../../mapper/studentMapper");
const getStudents = require("../../../utils/getStudents");

const adminGetStudentsController = async (req, res) => {
  try {
    const students = StudentMapper.toDtoBulk(await getStudents());

    res.status(200).json({ error: false, data: { students } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetStudentsController;
