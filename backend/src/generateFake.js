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
const dotenv = require("dotenv");
dotenv.config();
const generateFake = async () => {
  const college = new Faculty({
    name: "دانشگاه صنعتی",
    majors: [
      { name: "فیزیک", id: 1 },
      { name: "برق", id: 2 },
      { name: "مواد", id: 3 },
    ],
  });

  const college2 = new Faculty({
    name: "دانشگاه پزشکی",
    majors: [
      { name: "پزشکی", id: 1 },
      { name: "اتاق عمل", id: 2 },
      { name: "داروسازی", id: 3 },
    ],
  });

  const major = new Major({
    name: "برق",
  });
  const major2 = new Major({
    name: "پزشکی",
  });
  const major3 = new Major({
    name: "معماری",
  });
  const major4 = new Major({
    name: "داروسازی",
  });
  const major5 = new Major({
    name: "دامپزشکی",
  });

  const offCourse = new OfficialCourse({
    course_name: "مواد",
    course_id: "1",
  });
  const offCourse2 = new OfficialCourse({
    course_name: "مصالح",
    course_id: "2",
  });
  const offCourse3 = new OfficialCourse({
    course_name: "استخوان شناسی",
    course_id: "3",
  });
  const offCourse4 = new OfficialCourse({
    course_name: "الکترونیک",
    course_id: "4",
  });
  const offCourse5 = new OfficialCourse({
    course_name: "الاهیات",
    course_id: "5",
  });
  const offCourse6 = new OfficialCourse({
    course_name: "مبانی زمین شناسی",
    course_id: "6",
  });
  const offCourse7 = new OfficialCourse({
    course_name: "شیمی مواد",
    course_id: "7",
  });
  const offCourse8 = new OfficialCourse({
    course_name: "مواد",
    course_id: "8",
  });

  const admin = new ItManager({
    first_name: "معرفت",
    last_name: "حسین زاده",
    password: "123",
    username: "100",
    employee_ID: "100",
    email: "",
    phone_number: "",
    national_ID: "100",
    entrance_year: "2022",
  });

  const admin2 = new ItManager({
    first_name: "حسین",
    last_name: "کیاپور",
    password: "123",
    username: "101",
    employee_ID: "101",
    email: "",
    phone_number: "",
    national_ID: "101",
    entrance_year: "2022",
  });

  const manager = new EducationManager({
    first_name: "علی اکبر",
    last_name: "شاهی منش",
    password: "123",
    username: "200",
    employee_ID: "200",
    email: "",
    phone_number: "",
    national_ID: "200",
    entrance_year: "2022",
    faculty: { name: college.name, id: college._id },
    major: { name: major.name, id: major._id },
    level: "pro",
  });

  const manager2 = new EducationManager({
    first_name: "قاسم",
    last_name: "خدایی",
    password: "123",
    username: "201",
    employee_ID: "201",
    email: "",
    phone_number: "",
    national_ID: "201",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major2.name, id: major2._id },
    level: "pro",
  });

  const manager3 = new EducationManager({
    first_name: "فهمیه",
    last_name: "آیین دوست",
    password: "123",
    username: "202",
    employee_ID: "202",
    email: "",
    phone_number: "",
    national_ID: "202",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major4.name, id: major4._id },
    level: "pro",
  });

  const professor = new Professor({
    first_name: "حسین",
    last_name: "رحیمی",
    password: "123",
    username: "300",
    professor_ID: "300",
    email: "",
    phone_number: "",
    national_ID: "300",
    entrance_year: "2022",
    faculty: { name: college.name, id: college._id },
    major: { name: major.name, id: major._id },
    level: "pro",
  });
  const professor2 = new Professor({
    first_name: "محمد",
    last_name: "مشکین آبادی",
    password: "123",
    username: "301",
    professor_ID: "301",
    email: "",
    phone_number: "",
    national_ID: "301",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major4.name, id: major4._id },
    level: "pro",
  });
  const professor3 = new Professor({
    first_name: "امیرعلی",
    last_name: "سبحانی",
    password: "123",
    username: "302",
    professor_ID: "302",
    email: "",
    phone_number: "",
    national_ID: "302",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major5.name, id: major5._id },
    level: "pro",
  });
  const professor4 = new Professor({
    first_name: "اسکندر",
    last_name: "امینی",
    password: "123",
    username: "303",
    professor_ID: "303",
    email: "",
    phone_number: "",
    national_ID: "303",
    entrance_year: "2022",
    faculty: { name: college.name, id: college._id },
    major: { name: major3.name, id: major3._id },
    level: "pro",
  });

  const student = new Student({
    first_name: "رحیم",
    last_name: "قاعدی",
    password: "123",
    username: "400",
    student_ID: "400",
    email: "",
    phone_number: "",
    national_ID: "400",
    entrance_year: "2022",
    faculty: { name: college.name, id: college._id },
    major: { name: major3.name, id: major3._id },
    passed_courses: [offCourse, offCourse2],
    supervisor: professor4,
  });

  const student2 = new Student({
    first_name: "مهدی",
    last_name: "لهراسبی",
    password: "123",
    username: "401",
    student_ID: "401",
    email: "",
    phone_number: "",
    national_ID: "401",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major2.name, id: major2._id },
    passed_courses: [offCourse, offCourse2],
    supervisor: professor3,
  });

  const student3 = new Student({
    first_name: "طارخ ",
    last_name: "صناعی",
    password: "123",
    username: "402",
    student_ID: "402",
    email: "",
    phone_number: "",
    national_ID: "402",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major4.name, id: major4._id },
    passed_courses: [offCourse3, offCourse5],
    supervisor: professor3,
  });

  const student4 = new Student({
    first_name: "مریم",
    last_name: "مقدم",
    password: "123",
    username: "403",
    student_ID: "403",
    email: "",
    phone_number: "",
    national_ID: "403",
    entrance_year: "2022",
    faculty: { name: college.name, id: college._id },
    major: { name: major3.name, id: major3._id },
    passed_courses: [offCourse5, offCourse3],
    supervisor: professor4,
  });

  const student5 = new Student({
    first_name: "ثریا",
    last_name: "مهدیخانی",
    password: "123",
    username: "404",
    student_ID: "404",
    email: "",
    phone_number: "",
    national_ID: "404",
    entrance_year: "2022",
    faculty: { name: college2.name, id: college2._id },
    major: { name: major5.name, id: major5._id },
    passed_courses: [offCourse3, offCourse5],
    supervisor: professor3,
  });

  const sem = new SemesterCourse({
    course_id: offCourse.course_id,
    course_name: offCourse.course_name,

    class_times: [
      { day: 0, time: new Date().getTime() },
      { day: 5, time: new Date().getTime() },
    ],
    exam_time: new Date().getTime(),
    professor: `${professor.first_name} ${professor.last_name}`,
    capacity: 50,
    registrations: [],
    term: "",
  });

  const sem2 = new SemesterCourse({
    course_id: offCourse2.course_id,
    course_name: offCourse2.course_name,

    class_times: [
      { day: 5, time: new Date().getTime() },
      { day: 3, time: new Date().getTime() },
    ],
    exam_time: new Date().getTime(),
    professor: `${professor2.first_name} ${professor2.last_name}`,
    capacity: 60,
    registrations: [],
    term: "",
  });

  const prereg = new PreRegistration({
    courseId: sem._id,
    studentId: student._id,
    termId: "",
    isAccepted: "",
    date: new Date().getTime(),
  });
  const prereg2 = new PreRegistration({
    courseId: sem._id,
    studentId: student2._id,
    termId: "",
    isAccepted: "",
    date: new Date().getTime(),
  });
  const prereg3 = new PreRegistration({
    courseId: sem._id,
    studentId: student3._id,
    termId: "",
    isAccepted: "",
    date: new Date().getTime(),
  });

  sem.registrations = [prereg._id, prereg2._id, prereg3._id];

  const reg = new Registration({
    courseId: sem2._id,
    studentId: student4._id,
    termId: "",
    isAccepted: "",
    date: new Date().getTime(),
  });
  const reg2 = new Registration({
    courseId: sem2._id,
    studentId: student5._id,
    termId: "",
    isAccepted: "",
    date: new Date().getTime(),
  });
  const reg3 = new Registration({
    courseId: sem2._id,
    studentId: student2._id,
    termId: "",
    isAccepted: "",
    date: new Date().getTime(),
  });

  sem2.registrations = [reg._id, reg2._id, reg3._id];

  const term = new Term({
    term_id: "1",
    name: "پاییز ۱۴۰۲",
    start_date: new Date(2022, 04).getTime(),
    end_date: new Date(2022, 07).getTime(),
    students: [student._id, student2._id],
    professors: [professor._id, professor2._id],
    preregistration_courses: [sem._id],
    registration_courses: [sem2._id],
  });
  sem.term = term._id;
  sem2.term = term._id;
  prereg.termId = term._id;
  prereg2.termId = term._id;
  prereg3.termId = term._id;
  reg.termId = term._id;
  reg2.termId = term._id;
  reg3.termId = term._id;

  const items = [
    college,
    college2,
    major,
    major2,
    major3,
    major4,
    major5,
    offCourse,
    offCourse2,
    offCourse3,
    offCourse4,
    offCourse5,
    offCourse6,
    offCourse7,
    offCourse8,
    admin,
    admin2,
    manager,
    manager2,
    manager3,
    professor,
    professor2,
    professor3,
    professor4,
    student,
    student2,
    student3,
    student4,
    student5,
    term,
    sem,
    sem2,
    prereg,
    prereg2,
    prereg3,
    reg,
    reg2,
    reg3,
  ];

  mongoose
    .connect(process.env.mongoURl)
    .then(async () => {
      console.log("connected to database");
      const promise = items.map(async (i) => await i.save());
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

generateFake();
