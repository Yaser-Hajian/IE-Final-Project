const express = require("express");
const educationManagerController = require("./educationManager.controller");
const educationManagerValidator = require("./educationManager.validator");
const router = express.Router();

router.get(
  "/terms",
  educationManagerController.getTerms.bind(educationManagerController)
);

router.get(
  "/term/:id",
  educationManagerController.getTermById.bind(educationManagerController)
);

router.post(
  "/term",
  educationManagerController.createTerm.bind(educationManagerController)
);

router.put(
  "/term/:id",
  educationManagerController.updateTermById.bind(educationManagerController)
);

router.delete(
  "/term/:id",
  educationManagerController.deleteTermById.bind(educationManagerController)
);





router.post(
  "",
  educationManagerController.createCourse.bind(educationManagerController)
);
router.get(
  "",
  educationManagerController.getCourses.bind(educationManagerController)
);
router.get(
  "/:id",
  educationManagerController.getCourseById.bind(educationManagerController)
);
router.delete(
  "/:id",
  educationManagerController.deleteCourseById.bind(educationManagerController)
);
router.put(
  "/:id",
  educationManagerController.updateCourseById.bind(educationManagerController)
);
module.exports = router;
