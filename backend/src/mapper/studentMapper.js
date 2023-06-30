class StudentMapper {
  static toDto(studentMapper) {
    return {
      name: studentMapper.first_name,
      familyName: studentMapper.last_name,
      userType: studentMapper.userType,
      nationId: studentMapper.national_ID,
      id: studentMapper._id,
      studentId: studentMapper._id,
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
    };
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = StudentMapper;
