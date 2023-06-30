class FacultyMapper {
  static toDto(faculty) {
    return {
      name: faculty.first_name,
      id: faculty._id,
      majors: faculty.majors,
    };
  }
  static toDtoBulk(faculties) {
    return faculties.map(FacultyMapper.toDto);
  }
  static toPersistence(faculty) {
    return {
      name: faculty.first_name,
      id: faculty._id,
      majors: faculty.majors,
    };
  }
  static toPersistenceBulk(faculties) {
    return faculties.map(FacultyMapper.toPersistence);
  }
}

module.exports = FacultyMapper;
