const { OfficialCourse } = require("../../models/official_course");
const { SemesterCourse } = require("../../models/semester_course");
const Student = require("../../models/student");
const controller = require("./../controller");
const bcrypt = require("bcrypt");
const { Professor } = require("./../../models/professor");
const Term = require("../../models/term");
const e = require("express");
module.exports = new (class extends controller {
  //TODO: need validator
  async createCourse(req, res) {
    const { courseType } = req.body;
    if (courseType == "official") {
      const {
        course_name,
        course_id,
        major,
        credit,
        course_prerequisites,
        course_requirements,
      } = req.body;
      try {
        const newOfficialCourse = new OfficialCourse({
          course_name,
          course_id,
          major,
          credit,
          course_prerequisites,
          course_requirements,
        });
        await newOfficialCourse.save();
        console.log(newOfficialCourse);
        return res.json({
          data: newOfficialCourse,
          message: "successful",
        });
      } catch (error) {
        if (error.code == 11000) {
          return res.status(500).send("duplicate key error");
        }
        return res.status(500).send("we have error");
      }
    }
    const {
      course_name,
      course_id,
      major,
      credit,
      course_prerequisites,
      course_requirements,
      class_times,
      class_dates,
      exam_time,
      exam_date,
      exam_place,
      professor,
      capacity,
      semester,
    } = req.body;

    try {
      const newSemesterCourse = new SemesterCourse({
        course_name,
        course_id,
        major,
        credit,
        course_prerequisites,
        course_requirements,
        class_times,
        class_dates,
        exam_time,
        exam_date,
        exam_place,
        professor,
        capacity,
        semester,
      });
      await newSemesterCourse.save();
      console.log(newSemesterCourse);
      res.json({
        message: "successful",
        data: newSemesterCourse,
      });
    } catch (error) {
      return res.status(500).send("duplicate key error");
    }
    return res.status(500).send("we have error");
  }

  async getCourses(req, res) {
    try {
      const officialCourses = await OfficialCourse.find();
      const semesterCourses = await SemesterCourse.find();
      res.json({
        officialCourses: {
          count: officialCourses.length,
          data: officialCourses,
        },
        semesterCourses: {
          count: semesterCourses.length,
          data: semesterCourses,
        },
        message: "successful",
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async getCourseById(req, res) {
    const type = req.query.type;
    const course_id = req.params.id;
    if (!type) {
      res.status(400).send("you should set type of course");
    }

    if (isNaN(course_id)) {
      return res.status(400).send("ID must be a number");
    }
    if (type == "official") {
      const course = await OfficialCourse.findOne({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successful",
        data: course,
      });
    } else if (type == "semester") {
      const course = await SemesterCourse.findOne({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successful",
        data: course,
      });
    }
  }

  async deleteCourseById(req, res) {
    const type = req.query.type;
    const course_id = req.params.id;
    if (!type) {
      res.status(400).send("you should set type of course");
    }

    if (isNaN(course_id)) {
      return res.status(400).send("ID must be a number");
    }
    if (type == "official") {
      const course = await OfficialCourse.findOneAndDelete({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully delete",
        data: course,
      });
    } else if (type == "semester") {
      const course = await SemesterCourse.findOneAndDelete({ course_id });
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully deleted",
        data: course,
      });
    }
  }

  //TODO: validator needed
  async updateCourseById(req, res) {
    const type = req.query.type;
    const course_id = req.params.id;
    if (!type) {
      res.status(400).send("you should set type of course");
    }

    if (isNaN(course_id)) {
      return res.status(400).send("ID must be a number");
    }
    if (type == "official") {
      const {
        course_name,
        major,
        credit,
        course_prerequisites,
        course_requirements,
      } = req.body;
      const course = await OfficialCourse.findOneAndUpdate(
        { course_id },
        {
          course_name,
          major,
          credit,
          course_prerequisites,
          course_requirements,
        },
        {
          new: true,
        }
      );
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully updated",
        data: course,
      });
    } else if (type == "semester") {
      const {
        course_name,
        major,
        credit,
        course_prerequisites,
        course_requirements,
        class_times,
        class_dates,
        exam_time,
        exam_date,
        exam_place,
        professor,
        capacity,
        semester,
      } = req.body;
      const course = await SemesterCourse.findOneAndUpdate(
        { course_id },
        {
          course_name,
          major,
          credit,
          course_prerequisites,
          course_requirements,
          class_times,
          class_dates,
          exam_time,
          exam_date,
          exam_place,
          professor,
          capacity,
          semester,
        },
        {
          new: true,
        }
      );
      if (!course) {
        return res.status(404).json({
          message: "we do not have this id",
          data: null,
        });
      }
      return res.json({
        message: "successfully updated",
        data: course,
      });
    }
  }

  async getStudents(req, res) {
    try {
      const students = await Student.find().populate().select("-password");
      res.json({
        error: false,
        count: students.length,
        data: { students },
        message: "successful",
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async getStudentById(req, res) {
    const student_ID = req.params.id;
    if (isNaN(student_ID)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const student = await Student.findOne({ student_ID })
      .select("-password")
      .populate("supervisor");
    if (!student) {
      res.status(404).json({
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      data: student,
      message: "successful",
    });
  }

  async getProfessors(req, res) {
    try {
      const professors = await Professor.find().populate().select("-password");
      res.json({
        error: false,
        count: professors.length,
        data: { professors },
        message: "successful",
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  }

  async getProfessorById(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const professor = await Professor.findOne({ professor_ID: id }).select(
      "-password"
    );
    if (!professor) {
      res.status(404).json({
        error: true,
        message: "we do not have this id",
        data: null,
      });
      return;
    }
    res.status(200).json({
      error: false,
      data: professor,
      message: "successful",
    });
  }

  async getTerms(req, res) {
    try {
      const search = req.query.search;
      if (!search) {
        const terms = await Term.find().populate();
        res.status(200).json({ error: false, message: "", data: terms });
      }
      const IDs = search.split(",");
      let terms = [];
      for (let i = 0; index < IDs.length; i++) {
        const id = IDs[i];
        const term = await Term.findOne({ term_id: id }).populate();
        terms.push(term);
      }
      res.status(200).json({ error: false, message: "done", data: { terms } });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getTermById(req, res) {
    try {
      const term_id = req.params.id;
      if (isNaN(term_id)) {
        return res
          .status(400)
          .json({ error: true, message: "ID must be a number", data: null });
      }
      const term = await Term.findOne({ term_id }).populate();
      res.status(200).json({ error: false, message: "done", data: term });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async createTerm(req, res) {
    try {
      const { name, term_id, students, professors } = req.body;
      const new_term = Term(name, term_id);
      for (const student of students) {
        const wanted_student = await Student.findOne({
          student_ID: student.id,
        });
        new_term.students.push(wanted_student._id);
      }
      for (const professor of professors) {
        const wanted_professor = await Professor.findOne({
          professor_ID: professor.id,
        });
        new_term.students.push(wanted_professor._id);
      }
      await new_term.save();
      res.status(200).json({
        error: false,
        message: "new term created successfully",
        data: new_term,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateTermById(req, res) {
    try {
      const { name, term_id, students, professors } = req.body;
      const term = await Term.findOne({ term_id });
      if (!term) {
        res
          .status(400)
          .json({ error: true, message: "term not found", data: null });
      }

      let new_students = [];
      let new_professors = [];
      for (const student of students) {
        const wanted_student = await Student.findOne({
          student_ID: student.id,
        });
        new_students.push(wanted_student._id);
      }
      for (const professor of professors) {
        const wanted_professor = await Professor.findOne({
          professor_ID: professor.id,
        });
        new_students.push(wanted_professor._id);
      }

      const updated_Term = await findOneAndUpdate(
        { term_id },
        { name, students: new_students, professors: new_professors },
        { new: true }
      );
      res.status(200).send({
        error: false,
        message: "edited successfully",
        data: updated_Term,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async deleteTermById(req, res) {
    const term_id = req.params.id;
    if (isNaN(term_id)) {
      return res
        .status(400)
        .json({ error: true, message: "ID must be a number", data: null });
    }
    const deleted_term = await Term.findOneAndDelete({ term_id });
    if (!deleted_term) {
      return res
        .status(404)
        .json({ error: true, message: "term not found", data: null });
    }
    res.status(200).json({
      error: false,
      message: "deleted successfully",
      data: deleted_term,
    });
  }

  async createPreRegistration(req, res) {}
})();
