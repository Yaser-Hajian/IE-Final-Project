const express = require("express");
const router = express.Router();
const adminValidator = require("./admin.validator");
const adminController = require("./admin.controller");

router.post(
  "/ITMan",
  adminValidator.createITManValidator(),
  adminController.validate,
  adminController.createITManager.bind(adminController)
);

router.post(
  "/professor",
  adminValidator.createProfessorValidator(),
  adminController.validate,
  adminController.createProfessor.bind(adminController)
);

router.post(
  "/professors",
  adminController.createMultipleProfessor.bind(adminController)
);
router.get(
  "/professors",
  adminController.findAllProfessors.bind(adminController)
);

router.get(
  "/professor/:id",
  adminController.findProfessorById.bind(adminController)
);

router.delete(
  "/professor/:id",
  adminController.deleteProfessorById.bind(adminController)
);
router.put(
  "/professor/:id",
  adminValidator.updateProfessorValidator(),
  adminController.validate,
  adminController.updateProfessorById.bind(adminController)
);

router.post(
  "/student",
  adminValidator.createStudentValidator(),
  adminController.validate,
  adminController.createStudent.bind(adminController)
);

router.post("/students",adminController.createMultipleStudents.bind(adminController))

router.get("/students", adminController.findAllStudents.bind(adminController));

router.get(
  "/student/:id",
  adminController.findStudentById.bind(adminController)
);

router.put(
  "/student/:id",
  adminValidator.updateStudentValidator(),
  adminController.validate,
  adminController.updateStudentByID.bind(adminController)
);

router.delete(
  "/student/:id",
  adminController.deleteStudentByID.bind(adminController)
);

router.post(
  "/manager",
  adminValidator.createManagerValidator(),
  adminController.validate,
  adminController.createManager.bind(adminController)
);

router.post("/managers",adminController.createMultipleManagers.bind(adminController))

router.get("/managers", adminController.getAllManagers.bind(adminController));

router.get(
  "/manager/:id",
  adminController.findManagerByID.bind(adminController)
);

router.delete(
  "/manager/:id",
  adminController.deleteManagerById.bind(adminController)
);

router.put(
  "/manager/:id",
  adminValidator.updateManagerValidator(),
  adminController.validate,
  adminController.updateManagerById.bind(adminController)
);

module.exports = router;
