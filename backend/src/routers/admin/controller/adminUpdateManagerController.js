const ManagerMapper = require("../../../mapper/managerMapper");
const updateManager = require("../../../utils/updateManager");

const adminUpdateManagerController = async (req, res) => {
  try {
    const { managerId } = req.params;
    const managerData = req.body;
    await updateManager(managerId, ManagerMapper.toPersistence(managerData));

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminUpdateManagerController;
