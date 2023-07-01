class ProfessorMapper {
  static toDto(professor) {
    return {
      name: professor.first_name,
      familyName: professor.last_name,
      nationId: professor.national_ID,
      id: professor._id,
      professorId: professor.professor_ID,
      entryYear: professor.entrance_year,
      college: professor.faculty,
      major: professor.major,
      userType: "professor",
      level: professor.level,
      password: professor.password,
    };
  }
  static toDtoBulk(professor) {
    return professor.map(ProfessorMapper.toDto);
  }
  static toPersistence(professor) {
    return {
      first_name: professor.name,
      last_name: professor.familyName,
      userType: professor.userType,
      national_ID: professor.nationId,
      entrance_year: professor.entryYear,
      faculty: professor.college,
      major: professor.major,
      username: professor.professorId,
      password: professor.password,
      professor_ID: professor.professorId ?? professor.id,
      level: professor.level,
    };
  }
  static toPersistenceBulk(managers) {
    return managers.map(ProfessorMapper.toPersistence);
  }
}

module.exports = ProfessorMapper;
