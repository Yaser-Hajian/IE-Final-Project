const ManagerMapper = require("../../../mapper/managerMapper");
const getManagers = require("../../../utils/getManagers");

const adminGetManagersController = async (req, res) => {
  try {
    const managers = ManagerMapper.toDtoBulk(await getManagers());

    res.status(200).json({ error: false, data: { managers } }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetManagersController;
