const FacultyMapper = require("../../../mapper/facultyMapper");
const getFaculties = require("../../../utils/getFaculties");

const adminGetFacultiesController = async (req, res) => {
  try {
    const colleges = FacultyMapper.toDtoBulk(await getFaculties());

    res.status(200).json({ error: false, data: { colleges } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetFacultiesController;
