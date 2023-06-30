class professorMapper {
  static toDto(professor) {
    return {
      name: professor.first_name,
      familyName: professor.last_name,
      userType: professor.userType,
      nationId: professor.national_ID,
      id: professor._id,
      professorId: professor._id,
    };
  }
  static toDtoBulk(professors) {
    return professors.map(professorMapper.toDto);
  }
  static toPersistence(professor) {
    return {
      first_name: professor.name,
      last_name: professor.familyName,
      userType: professor.userType,
      national_ID: professor.nationId,
    };
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = professorMapper;
