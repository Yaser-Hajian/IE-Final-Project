class ManagerMapper {
  static toDto(manager) {
    return {
      name: manager.first_name,
      familyName: manager.last_name,
      nationId: manager.national_ID,
      id: manager._id,
      managerId: manager.employee_ID,
      entryYear: manager.entrance_year,
      college: manager.faculty,
      major: manager.major,
      userType: "manager",
      level: manager.level,
      password: manager.password,
    };
  }
  static toDtoBulk(managers) {
    return managers.map(ManagerMapper.toDto);
  }
  static toPersistence(manager) {
    return {
      first_name: manager.name,
      last_name: manager.familyName,
      userType: manager.userType,
      national_ID: manager.nationId,
      entrance_year: manager.entryYear,
      faculty: manager.college,
      major: manager.major,
      username: manager.managerId,
      password: manager.password,
      employee_ID: manager.managerId ?? manager.id,
      level: manager.level,
    };
  }
  static toPersistenceBulk(managers) {
    return managers.map(ManagerMapper.toPersistence);
  }
}

module.exports = ManagerMapper;
