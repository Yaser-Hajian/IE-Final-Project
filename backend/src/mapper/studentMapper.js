class StudentMapper {
  static toDto(student) {
    return {
      name: student.first_name,
      familyName: student.last_name,
      nationId: student.national_ID,
      id: student._id,
      studentId: student._id,
      entryYear: student.entrance_year,
      college: student.faculty,
      major: student.major,
      professor: student.supervisor,
      passedCourses: student.passed_courses,
      userType: "student",
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
      passed_courses: student.passedCourses,
      username: student.studentId,
      password: student.password,
      student_ID: student.studentId ?? student.id,
    };
  }
  static toPersistenceBulk(students) {
    return students.map(StudentMapper.toPersistence);
  }
}

module.exports = StudentMapper;
