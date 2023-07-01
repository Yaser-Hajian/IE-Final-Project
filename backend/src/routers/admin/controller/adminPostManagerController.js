const ManagerMapper = require("../../../mapper/managerMapper");
const postManager = require("../../../utils/postManager");

const adminPostManagerController = async (req, res) => {
  try {
    const manager = req.body;

    await postManager(ManagerMapper.toPersistence(manager));

    res.status(201).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminPostManagerController;
