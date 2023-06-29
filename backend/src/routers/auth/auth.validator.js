const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  loginValidator() {
    return [
      check("username").not().isEmpty().withMessage("username is invalid"),
      check("password").not().isEmpty().withMessage("password cant be empty"),
    ];
  }
})();
