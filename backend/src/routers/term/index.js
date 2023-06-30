const getTermByIdController = require("./controller/getTermByIdController");
const postTermController = require("./controller/postTermController");
const deleteTermController = require("./controller/deleteTermController");
const updateTermController = require("./controller/updateTermController");
const getTermRegistrationCoursesController = require("./controller/getTermRegistrationCoursesController");
const getTermPreregistrationCoursesController = require("./controller/getTermPreregistrationCoursesController");
const getPreregistrationsController = require("./controller/getPreregistrationsController");
const getRegistrationsController = require("./controller/getRegistrationsController");
const postRegistrationCourseController = require("./controller/postRegistrationCourseController");
const deleteRegistrationCourseController = require("./controller/deleteRegistrationCourseController");
const postPreregistrationCourseController = require("./controller/postPreregistrationCourseController");
const deletePreregistrationCourseController = require("./controller/deletePreregistrationCourseController");

const express = require("express");

const termRouter = express.Router();

termRouter.get("/term/:termId", getTermByIdController);
termRouter.post("/term", postTermController);
termRouter.delete("/term/:termId", deleteTermController);
termRouter.put("/term/:termId", updateTermController);
termRouter.get(
  "/term/:termId/registration_courses",
  getTermRegistrationCoursesController
);

termRouter.get(
  "/term/:termId/preregistration_courses",
  getTermPreregistrationCoursesController
);

termRouter.get("/term/:termId/preregistrations", getPreregistrationsController);

termRouter.get("/term/:termId/registrations", getRegistrationsController);

termRouter.post("/term/:termId/registration", postRegistrationCourseController);

termRouter.delete(
  "/term/:termId/registration",
  deleteRegistrationCourseController
);

termRouter.post(
  "/term/:termId/preregistration",
  postPreregistrationCourseController
);

termRouter.delete(
  "/term/:termId/preregistration",
  deletePreregistrationCourseController
);

module.exports = termRouter;
