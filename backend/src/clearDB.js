const { default: mongoose } = require("mongoose");
const { EducationManager } = require("./models/education_manager");
const Faculty = require("./models/faculty");
const { ItManager } = require("./models/it_manager");
const Major = require("./models/major");
const { OfficialCourse } = require("./models/official_course");
const PreRegistration = require("./models/pre_registration");
const { Professor } = require("./models/professor");
const Registration = require("./models/registration");
const { SemesterCourse } = require("./models/semester_course");
const Student = require("./models/student");
const Term = require("./models/term");
const User = require("./models/user")
const dotenv = require("dotenv");
dotenv.config();

const clearDB = async () => {
  const collections = [
    Term,
    User,
    Faculty,
    Major,
    SemesterCourse,
    OfficialCourse,
    Registration,
    PreRegistration,
  ];
  mongoose
    .connect(process.env.mongoURl)
    .then(async () => {
      console.log("connected to database");
      const promise = collections.map(async (i) => await i.deleteMany({}));
      await Promise.all(promise);
      console.log("finish");
      process.exit();
    })
    .catch((error) => {
      console.log("could not connect to database");
      console.log(process.env.mongoURl);
      console.log(error);
      process.exit();
    });
};

clearDB();
