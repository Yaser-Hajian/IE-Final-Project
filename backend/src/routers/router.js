const express = require("express");
const router = express.Router();
const authGuard = require("./../middleware/auth.guard");
const roleGuard = require("./../middleware/role.guard");
const redisAuthService = require("../redis/index");
const User = require("../models/user");
const getMeController = require("./term/controller/getMeController");
const getProfessorsController = require("./term/controller/getProfessorsConroller");
const getStudentsController = require("./term/controller/getStudentsConroller");
const acceptOrRejectRegistrationController = require("./term/controller/acceptOrRejectRegistrationController");
const adminRouter = require("./admin");
const getTermsController = require("./term/controller/getTermsController");
const termRouter = require("./term");
const courseRouter = require("./course");
const getCoursesController = require("./course/controllers/getCoursesController");

router.use("/", authGuard, roleGuard());

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
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
        .json({ error: true, message: "Unauthorized." })
        .end();
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: true, message: "InternalError" })
      .end();
  }
});

router.get("/signout", async (req, res) => {
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
});

router.get("/me", getMeController);
router.get("/terms", getTermsController);
router.use("/term", termRouter);
router.get("/professors", getProfessorsController);

router.get("/students", getStudentsController);

router.put(
  "/registration/:registrationId",
  acceptOrRejectRegistrationController
);

router.use("/admin", adminRouter);

router.get("/courses", getCoursesController);

router.use("/course", courseRouter);
module.exports = router;
