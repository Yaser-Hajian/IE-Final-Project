const express = require("express");
const router = express.Router();
const authRouter = require("./auth/auth.router");
const adminRouter = require("./admin/admin.router");
const authGuard = require("./../middleware/auth.guard");
const roleGuard = require("./../middleware/role.guard");
const educationManagerRouter = require("./education-manager/educationManager.router");
const checkRole = require("../middleware/checkRole");
const educationManagerController = require("./../routers/education-manager/educationManager.controller");
const studentController = require("./student/student.controller");
const studentRouter = require("./../routers/student/student.router");
const professorRouter = require("./../routers/professor/professor.router");
const redisAuthService = require("../redis/index");
const User = require("../models/user");
const getTermsController = require("./term/getTermsController");
const getTermByIdController = require("./term/getTermByIdController");
const postTermController = require("./term/postTermController");
const deleteTermController = require("./term/deleteTermController");
const updateTermController = require("./term/updateTermController");

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

router.get("/mee", (req, res) => {
  res.status(200).end();
});

router.use("/auth", authRouter);
router.use("/admin", authGuard, roleGuard("ItManager"), adminRouter);

router.get("/terms", getTermsController);
router.get("/term/:termId", getTermByIdController);
router.post("/term", postTermController);
router.delete("/term/:termId", deleteTermController);
router.put("/term/:termId", updateTermController);

router.use(
  "/edu-manager",
  authGuard,
  roleGuard("EducationManager"),
  educationManagerRouter
);

router.use("/course", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  if (req.isStudent) {
  }
  return res.status(401).json({ error: "Unauthorized" });
});
router.use("/courses", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  if (req.isStudent) {
    return studentRouter(req, res, next);
  }
  if (req.isProfessor) {
    return professorRouter(reg, res, next);
  }
  return res.status(401).json({ error: "Unauthorized" });
});
router.use("/course", authGuard, checkRole, (req, res, next) => {
  if (req.isEducationManager) {
    return educationManagerRouter(req, res, next);
  }
  if (req.isStudent) {
    return studentRouter(req, res, next);
  }
  if (req.isProfessor) {
    return professorRouter(reg, res, next);
  }
  return res.status(401).json({ error: "Unauthorized" });
});
router.get("/students", authGuard, checkRole, (req, res) => {
  if (req.isEducationManager) {
    return educationManagerController.getStudents(req, res);
  }
  return res.status(401).json({ error: "Unauthorized" });
});

router.get("/student/:id", authGuard, checkRole, (req, res) => {
  if (req.isEducationManager) {
    return educationManagerController.getStudentById(req, res);
  }
  return res.status(401).json({ error: "Unauthorized" });
});

router.get("/Professors", authGuard, checkRole, (req, res) => {
  if (req.isEducationManager) {
    return educationManagerController.getProfessors(req, res);
  }
  return res.status(401).json({ error: "Unauthorized" });
});

router.get("/Professor/:id", authGuard, checkRole, (req, res) => {
  if (req.isEducationManager) {
    return educationManagerController.getProfessorById(req, res);
  }
  return res.status(401).json({ error: "Unauthorized" });
});

router.put("/student/:id", authGuard, checkRole, (req, res) => {
  if (req.isStudent) {
    return studentController.updateStudentById(req, res);
  }
  return res.status(401).json({ error: "Unauthorized" });
});

router.get("/me", authGuard, (req, res) => {
  const user = req.user;
  res.send({ error: false, message: "successful", data: user });
});
module.exports = router;
