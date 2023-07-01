const ProfessorMapper = require("./professorMapper");
const StudentMapper = require("./studentMapper");

class TermMapper {
  static toDto(term) {
    return {
      name: term.name,
      termId: term.term_id ?? term._id,
      students: StudentMapper.toDtoBulk(term.students),
      professors: ProfessorMapper.toDtoBulk(term.professors),
      preregistrationCourses: term.preregistration_courses,
      registrationCourses: term.registration_courses,
      courseNum: term.registration_courses.length,
      studentNum: term.students.length,
      startDate: term.start_date,
      endDate: term.end_date,
      id: term._id,
    };
  }
  static toDtoBulk(terms) {
    return terms.map(TermMapper.toDto);
  }
  static toPersistence(term) {
    const courses = {};
    if (term.preregistrationCourses != null) {
      courses["preregistration_courses"] = term.preregistrationCourses;
    }
    if (term.registrationCourses != null) {
      courses["registration_courses"] = term.registrationCourses;
    }
    return {
      ...courses,
      professors: term.professors,
      students: term.students,
      name: term.name,
      start_date: term.startDate,
      end_date: term.endDate,
      term_id: term.id ?? term.termId,
    };
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = TermMapper;
