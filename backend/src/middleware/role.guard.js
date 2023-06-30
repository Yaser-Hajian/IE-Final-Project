const rolesAndAccess = require("./rolesAndAccess");

const roleGuard = () => async (req, res, next) => {
  if (req.url == "/login") return next();
  try {
    const { userType } = req.user;
    const { url } = req;
    const isUserHasAccess =
      rolesAndAccess[userType].filter((u) => new RegExp(u).test(url)).length !=
      0;
    if (isUserHasAccess) {
      return next();
    }
    res.status(403).json({ error: true, message: "Forbidden." }).end();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: true, message: "Server Internal Error." })
      .end();
  }
};

module.exports = roleGuard;
