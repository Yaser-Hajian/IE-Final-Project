const ManagerMapper = require("../../mapper/managerMapper");
const getManager = require("../../utils/getManager");

const adminGetManagerController = async (req, res) => {
  try {
    const { managerId } = req.params;
    const manager = ManagerMapper.toDto(await getManager(managerId));

    res.status(200).json({ error: false, data: manager }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminGetManagerController;
