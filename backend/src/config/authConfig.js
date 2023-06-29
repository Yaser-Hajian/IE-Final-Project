const dotenv = require("dotenv");
dotenv.config();

const appSecret = process.env.APP_SECRET;

module.exports = {
  secret: appSecret ?? "default",
  tokenExpiryTime: 300,
};
