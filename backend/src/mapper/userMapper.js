class UserMapper {
  static toDto(user) {
    return {
      name: user.first_name,
      familyName: user.last_name,
      userType: user.userType.toLowerCase(),
      nationId: user.national_ID,
    };
  }
  static toDtoBulk(users) {
    return users.map(UserMapper.toDto);
  }
  static toPersistence(user) {
    return {
      first_name: user.name,
      last_name: user.familyName,
      userType: user.userType,
      national_ID: user.nationId,
    };
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = UserMapper;
