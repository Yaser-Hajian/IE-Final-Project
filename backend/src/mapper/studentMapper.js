class StudentMapper {
  static toDto(student) {
    return {
      name: student.first_name,
      familyName: student.last_name,
      userType: student.userType,
      nationId: student.national_ID,
      id: student._id,
      studentId: student._id,
      entryYear: student.entrance_year,
      college: student.faculty,
      major: student.major,
      professor: student.supervisor,
    };
  }
  static toDtoBulk(students) {
    return students.map(StudentMapper.toDto);
  }
  static toPersistence(student) {
    return {
      first_name: student.name,
      last_name: student.familyName,
      userType: student.userType,
      national_ID: student.nationId,
      entrance_year: student.entryYear,
      faculty: student.college,
      major: student.major,
      supervisor: student.professor,
    };
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = StudentMapper;
