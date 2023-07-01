const User = require("../models/user");
const redisAuthService = require("../redis/index");

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = redisAuthService.signJWT({ id: username });
      const refreshToken = redisAuthService.createRefreshToken();
      await redisAuthService.addToken(username, refreshToken, token);
      return res
        .status(200)
        .json({ error: false, data: { token: refreshToken } });
    } else {
      return res
        .status(401)
        .json({ error: true, message: "نام کاربری یا پسورد اشتباه میباشد" })
        .end();
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: true, message: "InternalError" })
      .end();
  }
};

module.exports = loginController;
