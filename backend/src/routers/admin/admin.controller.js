const controller = require("./../controller");
const { Professor } = require("./../../models/professor");
const Student = require("./../../models/student");
const bcrypt = require("bcrypt");
const { EducationManager } = require("./../../models/education_manager");
const { ItManager } = require("./../../models/it_manager");
const Major = require("../../models/major");
const Faculty = require("../../models/faculty");
module.exports = new (class extends controller {
  async createITManager(req, res) {
    let {
      first_name,
      last_name,
      username,
      password,
      phone_number,
      email,
      employee_ID,
      national_ID,
      entrance_year,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const new_ITMan = new ItManager({
      first_name,
      last_name,
      username,
      password,
      phone_number,
      email,
      national_ID,
      employee_ID,
      entrance_year,
    });
    await new_ITMan.save();
    console.log(new_ITMan);
    res.status(200).json({
      message: "IT Manager was created successfully!",
      data: new_ITMan,
    });
  }

  async createProfessor(req, res) {
    try {
      let {
        first_name,
        last_name,
        username,
        password,
        phone_number,
        email,
        major,
        faculty,
        professor_ID,
        national_ID,
        level,
        entrance_year,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const my_major = await Major.findOne({ name: major.name });
      const my_faculty = await Faculty.findOne({ name: faculty.name });

      const new_prof = new Professor({
        first_name,
        last_name,
        username,
        password,
        phone_number,
        major: my_major._id,
        email,
        level,
        national_ID,
        faculty: my_faculty._id,
        professor_ID,
        entrance_year,
      });
      await new_prof.save();
      res.status(200).json({
        message: "professor was created successfully!",
        data: new_prof,
        error: null,
      });
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(400)
          .json({ error: true, message: "duplicate key error", data: null });
      }
    }
  }

  async createMultipleProfessor(req, res) {
    try {
      const { professors } = req.body;
      let new_professors = [];
      for (const prof of professors) {
        let {
          first_name,
          last_name,
          username,
          password,
          phone_number,
          email,
          major,
          faculty,
          professor_ID,
          national_ID,
          level,
          entrance_year,
        } = prof;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const my_major = await Major.findOne({ name: major.name });
        const my_faculty = await Faculty.findOne({ name: faculty.name });

        const new_prof = new Professor({
          first_name,
          last_name,
          username,
          password,
          phone_number,
          major: my_major._id,
          email,
          level,
          national_ID,
          faculty: my_faculty._id,
          professor_ID,
          entrance_year,
        });
        await new_prof.save();
        new_professors.push(new_prof);
      }
      res.status(200).json({
        error: false,
        message: "All professors saved successfully",
        data: new_professors,
      });
    } catch (error) {
      res.status(500).json({ error: true, message: "error", data: null });
    }
  }

  async findAllProfessors(req, res) {
    const professors = await Professor.find()
      .populate("major")
      .populate("faculty")
      .select("-password");
    res.json({ data: professors, message: "successful" });
  }

  async findProfessorById(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const professor = await Professor.findOne({ professor_ID: id })
      .select("-password")
      .populate("faculty")
      .populate("major");
    if (!professor) {
      res.status(404).json({
        message: "we do not have this id",
        data: null,
        error: true,
      });
      return;
    }
    res.status(200).json({
      data: professor,
      message: "successful",
      error: false,
    });
  }

  async deleteProfessorById(req, res) {
    const professor_ID = req.params.id;
    if (isNaN(professor_ID)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const deletedProfessor = await Professor.findOneAndDelete({
      professor_ID,
    });
    if (!deletedProfessor) {
      res
        .status(404)
        .json({ error: true, message: "professor not found", data: null });
      return;
    }
    res.status(200).json({
      data: deletedProfessor,
      message: "professor deleted successfully",
      error: false,
    });
  }

  async updateProfessorById(req, res) {
    const professor_ID = req.params.id;
    if (isNaN(professor_ID)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    let {
      level,
      faculty,
      major,
      phone_number,
      email,
      username,
      password,
      first_name,
      last_name,
      entrance_year,
      national_ID,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const my_major = await Major.findOne({ name: major.name });
    const my_faculty = await Faculty.findOne({ name: faculty.name });

    try {
      const updatedProfessor = await Professor.findOneAndUpdate(
        { professor_ID },
        {
          level,
          faculty: my_faculty._id,
          major: my_major._id,
          phone_number,
          email,
          username,
          password,
          first_name,
          last_name,
          entrance_year,
          national_ID,
        },
        { new: true, select: "-password" }
      );
      if (!updatedProfessor) {
        return res
          .status(404)
          .json({ error: true, message: "Professor not found", data: null });
      }
      return res
        .status(200)
        .json({ error: false, message: "successful", data: updatedProfessor });
    } catch (error) {
      return res
        .status(500)
        .send({ error: true, message: "Error updating professor", data: null });
    }
  }

  async createStudent(req, res) {
    try {
      let {
        first_name,
        last_name,
        username,
        password,
        phone_number,
        email,
        student_ID,
        education_level,
        entrance_year,
        entrance_semester,
        major,
        faculty,
        professor,
        national_ID,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const my_major = await Major.findOne({ name: major.name });
      const my_faculty = await Faculty.findOne({ name: faculty.name });

      const supervisor = await Professor.findOne({
        professor_ID: professor.id,
      });
      if (!supervisor) {
        res
          .status(400)
          .json({ error: true, message: "professor not found", data: null });
      }

      const new_student = new Student({
        first_name,
        last_name,
        username,
        password,
        phone_number,
        email,
        student_ID,
        national_ID,
        education_level,
        entrance_year,
        entrance_semester,
        major: my_major._id,
        faculty: my_faculty._id,
        supervisor: supervisor._id,
      });
      await new_student.save();
      return res.send(new_student);
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ error: true, message: "duplicate key error", data: null });
      }
      return res
        .status(500)
        .send({ error: true, message: "we have error", data: null });
    }
  }

  async createMultipleStudents(req, res) {
    const { students } = req.body;
    try {
      let new_students = [];
      for (const st of students) {
        let {
          first_name,
          last_name,
          username,
          password,
          phone_number,
          email,
          student_ID,
          education_level,
          entrance_year,
          entrance_semester,
          major,
          faculty,
          professor,
          national_ID,
        } = st;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const my_major = await Major.findOne({ name: major.name });
        const my_faculty = await Faculty.findOne({ name: faculty.name });

        const supervisor = await Professor.findOne({
          professor_ID: professor.id,
        });
        if (!supervisor) {
          res
            .status(400)
            .json({ error: true, message: "professor not found", data: null });
        }

        const new_student = new Student({
          first_name,
          last_name,
          username,
          password,
          phone_number,
          email,
          student_ID,
          national_ID,
          education_level,
          entrance_year,
          entrance_semester,
          major: my_major._id,
          faculty: my_faculty._id,
          supervisor: supervisor._id,
        });
        await new_student.save();
        new_students.push(new_student);
      }
      res.status(200).json({
        error: false,
        message: "All students added",
        data: new_students,
      });
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ error: true, message: "duplicate key error", data: null });
      }
      return res
        .status(500)
        .send({ error: true, message: "we have error", data: null });
    }
  }

  async findAllStudents(req, res) {
    const students = await Student.find()
      .populate("faculty")
      .populate("major")
      .populate("supervisor")
      .select("-password");
    res.json({
      count: students.length,
      data: students,
      message: "successful",
    });
  }

  async findStudentById(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const student = await Student.findOne({ student_ID })
      .populate("supervisor")
      .populate("major")
      .populate("faculty")
      .select("-password");
    if (!student) {
      res.status(404).json({
        error: true,
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      data: student,
      message: "successful",
      error: false,
    });
  }

  async deleteStudentByID(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const deletedStudent = await Student.findOneAndDelete({
      student_ID,
    }).select("-password");
    if (!deletedStudent) {
      res.status(404).json("Student not found");
      return;
    }
    if (deletedStudent.userType != "Student") {
      res.send("this user is not student");
    }
    res.status(200).json({
      data: deletedStudent,
      message: "student deleted successfully",
      error: false,
    });
  }

  async updateStudentByID(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res.status(400).send("ID must be a number");
    }
    let {
      faculty,
      major,
      phone_number,
      email,
      username,
      password,
      first_name,
      last_name,
      average_score,
      professor,
    } = req.body;

    average_score = average_score ? average_score : null;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const my_major = await Major.findOne({ name: major.name });
    const my_faculty = await Faculty.findOne({ name: faculty.name });

    const supervisor = await Professor.findOne({ professor_ID: professor.id });
    if (!supervisor) {
      res
        .status(400)
        .json({ error: true, message: "professor not found", data: null });
    }
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { student_ID },
        {
          faculty: my_faculty._id,
          major: my_major._id,
          phone_number,
          email,
          username,
          password,
          first_name,
          last_name,
          average_score,
          supervisor: supervisor._id,
        },
        { new: true, select: "-password" }
      );
      if (!updatedStudent) {
        return res.status(404).send("Student not found");
      }
      return res.send(updatedStudent);
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send("duplicate value Error");
      }
      return res.status(500).send("Error updating student");
    }
  }

  async createManager(req, res) {
    try {
      let {
        first_name,
        last_name,
        username,
        password,
        phone_number,
        email,
        employee_ID,
        faculty,
        national_ID,
        entrance_year,
        major,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const my_major = await Major.findOne({ name: major.name });
      const my_faculty = await Faculty.findOne({ name: faculty.name });

      const new_manager = new EducationManager({
        first_name,
        last_name,
        username,
        password,
        phone_number,
        email,
        employee_ID,
        faculty: my_faculty._id,
        national_ID,
        entrance_year,
        major: my_major._id,
      });
      await new_manager.save();
      return res
        .status(201)
        .json({ error: false, data: new_manager, message: "successful" });
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(400)
          .json({ error: true, message: "duplicate key error", data: null });
      }
      return res
        .status(500)
        .json({ error: true, message: "we have error", data: null });
    }
  }

  async createMultipleManagers(req, res) {
    try {
      const managers = req.body;
      let new_managers = [];
      for (const man of managers) {
        let {
          first_name,
          last_name,
          username,
          password,
          phone_number,
          email,
          employee_ID,
          faculty,
          national_ID,
          entrance_year,
          major,
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const my_major = await Major.findOne({ name: major.name });
        const my_faculty = await Faculty.findOne({ name: faculty.name });

        const new_manager = new EducationManager({
          first_name,
          last_name,
          username,
          password,
          phone_number,
          email,
          employee_ID,
          faculty: my_faculty._id,
          national_ID,
          entrance_year,
          major: my_major._id,
        });
        await new_manager.save();
        new_managers.push(new_manager);
      }
      res.status(201).json({
        error: false,
        message: "All managers added",
        data: new_managers,
      });
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(400)
          .json({ error: true, message: "duplicate key error", data: null });
      }
      return res
        .status(500)
        .json({ error: true, message: "we have error", data: null });
    }
  }

  async getAllManagers(req, res) {
    try {
      const managers = await EducationManager.find()
        .populate("faculty")
        .populate("major")
        .select("-password");
      res.json({
        count: managers.length,
        data: { managers },
        message: "successful",
        error: false,
      });
    } catch (error) {
      res.status(500).json({ error: true, message: "error", data: null });
    }
  }

  async findManagerByID(req, res) {
    const employee_ID = req.params.id;
    if (isNaN(employee_ID)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const manager = await EducationManager.findOne({ employee_ID })
      .select("-password")
      .populate("faculty")
      .populate("major");
    if (!manager) {
      res.status(404).json({
        error: true,
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      data: manager,
      message: "successful",
      error: false,
    });
  }

  async deleteManagerById(req, res) {
    const employee_ID = req.params.id;
    if (isNaN(employee_ID)) {
      return res.status(400).send("ID must be a number");
    }
    const deletedManager = await EducationManager.findOneAndDelete({
      employee_ID,
    }).select("-password");
    if (!deletedManager) {
      res.status(404).json("manager not found");
      return;
    }
    if (deletedManager.userType != "EducationManager") {
      res.send("this user is not education manager");
    }
    res.status(200).json({
      data: deletedManager,
      message: "education manager deleted successfully",
    });
  }

  async updateManagerById(req, res) {
    const employee_ID = req.params.id;
    if (isNaN(employee_ID)) {
      return res.status(400).send("ID must be a number");
    }
    let {
      faculty,
      phone_number,
      email,
      username,
      password,
      first_name,
      last_name,
      entrance_year,
      major,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const my_major = await Major.findOne({ name: major.name });
    const my_faculty = await Faculty.findOne({ name: faculty.name });

    try {
      const updatedManager = await EducationManager.findOneAndUpdate(
        { employee_ID },
        {
          faculty: my_faculty._id,
          major: my_major._id,
          phone_number,
          email,
          username,
          password,
          first_name,
          last_name,
          entrance_year,
        },
        { new: true, select: "-password" }
      );
      if (!updatedManager) {
        return res.status(404).send("Manager not found");
      }
      return res.send(updatedManager);
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send("duplicate value Error");
      }
      return res.status(500).send("Error updating student");
    }
  }
})();
