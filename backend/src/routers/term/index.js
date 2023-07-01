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

termRouter.get("/:termId", getTermByIdController);
termRouter.post("", postTermController);
termRouter.delete("/:termId", deleteTermController);
termRouter.put("/:termId", updateTermController);
termRouter.get(
  "/:termId/registration_courses",
  getTermRegistrationCoursesController
);

termRouter.get(
  "/:termId/preregistration_courses",
  getTermPreregistrationCoursesController
);

termRouter.get("/:termId/preregistrations", getPreregistrationsController);

termRouter.get("/:termId/registrations", getRegistrationsController);

termRouter.post("/:termId/registration", postRegistrationCourseController);

termRouter.delete("/:termId/registration", deleteRegistrationCourseController);

termRouter.post(
  "/:termId/preregistration",
  postPreregistrationCourseController
);

termRouter.delete(
  "/:termId/preregistration",
  deletePreregistrationCourseController
);

module.exports = termRouter;
