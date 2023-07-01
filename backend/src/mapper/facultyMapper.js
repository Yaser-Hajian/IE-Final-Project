class FacultyMapper {
  static toDto(faculty) {
    return {
      name: faculty.name,
      id: faculty._id ?? faculty.id,
      majors: faculty.majors,
    };
  }
  static toDtoBulk(faculties) {
    return faculties.map(FacultyMapper.toDto);
  }
  static toPersistence(faculty) {
    return {
      name: faculty.name,
      majors: faculty.majors,
    };
  }
  static toPersistenceBulk(faculties) {
    return faculties.map(FacultyMapper.toPersistence);
  }
}

module.exports = FacultyMapper;
