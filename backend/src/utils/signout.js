const redisAuthService = require("../redis/index");

const signoutController = async (req, res) => {
  const refreshToken = req.headers.authorization;
  const id = req.user.username;
  try {
    await redisAuthService.clearToken(id, refreshToken);
    return res.status(200).json({ error: false }).end();
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "InternalError" })
      .end();
  }
};

module.exports = signoutController;
