const express = require("express");
const getCourseController = require("./controllers/getCourseController");
const getCourseRegistrationsController = require("./controllers/getCourseRegistrationsController");
const postRegisterCourse = require("./controllers/postRegisterCourseController");
const deleteRegisterCourse = require("./controllers/deleteRegisterCourseController");
const postPreregisterCourseController = require("./controllers/postPreregisterCourseController");
const deletePreregisterCourseController = require("./controllers/deletePreregisterCourseController");

const courseRouter = express.Router();

courseRouter.get("/:courseId", getCourseController);

courseRouter.get("/:courseId/registrations", getCourseRegistrationsController);
courseRouter.get(
  "/:courseId/preregistrations",
  getCourseRegistrationsController
);

courseRouter.post("/register/:courseId", postRegisterCourse);
courseRouter.delete("/register/:courseId", deleteRegisterCourse);

courseRouter.post("/preregister/:courseId", postPreregisterCourseController);
courseRouter.delete(
  "/preregister/:courseId",
  deletePreregisterCourseController
);

module.exports = courseRouter;
