const UserMapper = require("../../mapper/userMapper");

const getMeController = async (req, res) => {
  try {
    const userData = req.user;
    let data = UserMapper.toDto(userData);
    data["id"] = userData._id.toString();
    if (userData.userType == "student") {
      data["studentId"] = userData._id.toString();
    } else if (userType == "professor") {
      data["professorId"] = userData._id.toString();
    } else if (userType == "manager") {
      data["managerId"] = userData._id.toString();
    }
    res.status(200).json({ error: false, data }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getMeController;
