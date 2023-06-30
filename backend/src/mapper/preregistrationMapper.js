class PreregistrationMapper {
  static toDto(preregistration) {
    return {
      name: preregistration.name,
      familyName: preregistration.familyName,
      id: preregistration._id,
      date: preregistration.date,
      isPass: preregistration.isAccepted,
      courseId: preregistration.courseId,
    };
  }
  static toDtoBulk(preregistrations) {
    return preregistrations.map(PreregistrationMapper.toDto);
  }
  static toPersistence(preregistration) {
    return {};
  }
  static toPersistenceBulk(preregistration) {
    return {};
  }
}

module.exports = PreregistrationMapper;
