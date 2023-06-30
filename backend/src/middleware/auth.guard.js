const User = require("./../models/user");
const redisAuthService = require("../redis/index");

const authGuard = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token == null) {
    if (req.url === "/login") {
      return next();
    }
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized.", data: null })
      .end();
  }

  try {
    if (req.url === "/login") {
      return res
        .status(400)
        .json({ error: true, message: "Bad Request.", data: null })
        .end();
    }
    const id = await redisAuthService.getIdFromRefreshToken(token);
    const user = await User.findOne({ username: id }).exec();
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized.", data: null })
      .end();
  }
};

module.exports = authGuard;
