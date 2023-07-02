const express = require("express");
const authGuard = require("./../middleware/auth.guard");
const roleGuard = require("./../middleware/role.guard");
const getMeController = require("./term/controller/getMeController");
const getProfessorsController = require("./term/controller/getProfessorsConroller");
const getStudentsController = require("./term/controller/getStudentsConroller");
const acceptOrRejectRegistrationController = require("./term/controller/acceptOrRejectRegistrationController");
const getTermsController = require("./term/controller/getTermsController");
const getCoursesController = require("./course/controllers/getCoursesController");
const loginController = require("../utils/login");
const signoutController = require("../utils/signout");
const adminRouter = require("./admin");
const termRouter = require("./term");
const courseRouter = require("./course");

const router = express.Router();

router.post("/login", loginController);



router.use("/",authGuard, roleGuard());
router.use("/admin", adminRouter);


router.get("/signout", signoutController);

router.get("/me", getMeController);
router.get("/terms", getTermsController);
router.use("/term", termRouter);
router.get("/professors", getProfessorsController);

router.get("/students", getStudentsController);

router.put(
  "/registration/:registrationId",
  acceptOrRejectRegistrationController
);



router.get("/courses", getCoursesController);

router.use("/course", courseRouter);
module.exports = router;
