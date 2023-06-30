const ManagerMapper = require("../../mapper/managerMapper");
const postManagers = require("../../utils/postManagers");

const adminPostManagersController = async (req, res) => {
  try {
    const { managers } = req.body;
    await postManagers(ManagerMapper.toPersistenceBulk(managers));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostManagersController;
