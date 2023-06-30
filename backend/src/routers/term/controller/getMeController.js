const PreregistrationMapper = require("../../../mapper/preregistrationMapper");
const UserMapper = require("../../../mapper/userMapper");
const PreRegistration = require("../../../models/pre_registration");
const Registration = require("../../../models/registration");

const getMeController = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    let data = UserMapper.toDto(userData);
    data["id"] = userData._id.toString();
    if (userData.userType == "Student") {
      data["studentId"] = userData._id.toString();
      const registrations = await Registration.find({
        studentId: userData._id,
      });
      data["registrations"] = PreregistrationMapper.toDtoBulk(registrations);

      const preregistrations = await PreRegistration.find({
        studentId: userData._id,
      });
      data["preregistrations"] =
        PreregistrationMapper.toDtoBulk(preregistrations);
    } else if (userData.userType == "Professor") {
      data["professorId"] = userData._id.toString();
    } else if (userData.userType == "EducationManager") {
      data["managerId"] = userData._id.toString();
      data["userType"] = "manager";
    } else if (userData.userType == "ItManager") {
      data["employee_ID"] = userData._id.toString();
      data["userType"] = "admin";
    }
    res.status(200).json({ error: false, data }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = getMeController;
