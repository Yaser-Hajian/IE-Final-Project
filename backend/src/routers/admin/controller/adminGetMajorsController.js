const MajorMapper = require("../../../mapper/majorMapper");
const getMajors = require("../../../utils/getMajors");

const adminGetMajorsController = async (req, res) => {
  try {
    const majors = MajorMapper.toDtoBulk(await getMajors());

    res
      .status(200)
      .json({ error: false, data: { majors: majors } })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetMajorsController;
