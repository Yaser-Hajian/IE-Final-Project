const deleteManager = require("../../utils/deleteManager");

const adminDeleteManagerController = async (req, res) => {
  try {
    const { managerId } = req.params;

    await deleteManager(managerId);

    res.status(200).json({ error: false }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Error." }).end();
  }
};

module.exports = adminDeleteManagerController;
