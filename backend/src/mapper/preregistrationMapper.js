class PreregistrationMapper {
  static toDto(preregistration) {
    return {
      name: preregistration.name,
      familyName: preregistration.familyName,
      id: preregistration.id,
      date: preregistration.date,
      isPass: preregistration.isAccepted,
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
