const adminGetStudentsController = require("../admin/controller/adminGetStudentsController");
const adminGetStudentController = require("../admin/controller/adminGetStudentController");
const adminPostStudentsController = require("../admin/controller/adminPostStudentsController");
const adminPostStudentController = require("../admin/controller/adminPostStudentController");
const adminUpdateStudentController = require("../admin/controller/adminDeleteStudentController");
const adminDeleteStudentController = require("../admin/controller/adminDeleteStudentController");
const adminPostManagerController = require("../admin/controller/adminPostManagerController");
const adminPostManagersController = require("../admin/controller/adminPostManagersController");
const adminGetManagersController = require("../admin/controller/adminGetManagersController");
const adminGetManagerController = require("../admin/controller/adminGetManagerController");
const adminDeleteManagerController = require("../admin/controller/adminDeleteManagerController");
const adminUpdateManagerController = require("../admin/controller/adminUpdateManagerController");
const adminPostProfessorController = require("../admin/controller/adminPostProfessorController");
const adminPostProfessorsController = require("../admin/controller/adminPostProfessorsController");
const adminGetProfessorsController = require("../admin/controller/adminGetProfessorsController");
const adminGetProfessorController = require("../admin/controller/adminGetProfessorController");
const adminDeleteProfessorController = require("../admin/controller/adminDeleteProfessorController");
const adminUpdateProfessorController = require("../admin/controller/adminUpdateProfessorController");
const adminGetMajorsController = require("../admin/controller/adminGetMajorsController");
const adminGetFacultiesController = require("../admin/controller/adminGetFacultiesController");
const adminPostFacultyController = require("../admin/controller/adminPostFacultyController");
const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/students", adminGetStudentsController);
adminRouter.get("/student/:studentId", adminGetStudentController);
adminRouter.post("/students", adminPostStudentsController);
adminRouter.post("/student", adminPostStudentController);
adminRouter.put("/student/:studentId", adminUpdateStudentController);
adminRouter.delete("/student/:studentId", adminDeleteStudentController);

adminRouter.get("/managers", adminGetManagersController);
adminRouter.get("/manager/:managerId", adminGetManagerController);
adminRouter.post("/managers", adminPostManagersController);
adminRouter.post("/manager", adminPostManagerController);
adminRouter.delete("/manager/:managerId", adminDeleteManagerController);
adminRouter.put("/manager/:managerId", adminUpdateManagerController);

adminRouter.get("/professors", adminGetProfessorsController);
adminRouter.get("/professor/:professorId", adminGetProfessorController);
adminRouter.post("/professors", adminPostProfessorsController);
adminRouter.post("/professor", adminPostProfessorController);
adminRouter.delete("/professor/:professorId", adminDeleteProfessorController);
adminRouter.put("/professor/:professorId", adminUpdateProfessorController);

adminRouter.get("/majors", adminGetMajorsController); // added manually with script
adminRouter.get("/faculties", adminGetFacultiesController); // added manually with script
adminRouter.post("/faculty", adminPostFacultyController);

module.exports = adminRouter;
