const rolesAndAccess = {
  student: [/^\/terms$/, /^\/term\/[0-9A-Za-z]+$/, /^\/mee$/],
  manager: [],
  professor: [],
  admin: [],
};

module.exports = rolesAndAccess;
