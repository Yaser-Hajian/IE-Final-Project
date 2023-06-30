class TermMapper {
  static toDto(term) {
    return {
      name: term.name,
      termId: term.term_id,
      students: term.students,
      professors: term.professors,
      courses: term.semester_courses,
      courseNum: term.semester_courses.length,
      studentNum: term.students.length,
      startDate: term.start_date,
      endDate: term.end_date,
      id: term.term_id,
    };
  }
  static toDtoBulk(terms) {
    return terms.map(TermMapper.toDto);
  }
  static toPersistence(term) {
    return {};
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = TermMapper;
