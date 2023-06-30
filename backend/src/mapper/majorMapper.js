class MajorMapper {
  static toDto(major) {
    return {
      name: major.name,
      id: major._id ?? major.id,
    };
  }
  static toDtoBulk(majors) {
    return majors.map(MajorMapper.toDto);
  }
  static toPersistence(major) {
    return {
      name: major.first_name,
      id: major._id,
    };
  }
  static toPersistenceBulk(majors) {
    return majors.map(MajorMapper.toPersistence);
  }
}

module.exports = MajorMapper;
