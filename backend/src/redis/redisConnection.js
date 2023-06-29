const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const redisClient = createClient({
  socket: {
    port: 6379,
    host: "localhost",
  },
});

redisClient.on("connect", () => {
  console.log(`[Redis]: Connected to redis server at ${"localhost"}:${3232}`);
});

module.exports = { redisClient };
