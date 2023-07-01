const AbstractRedisClient = require("./redisAbstract");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const randToken = require("rand-token");
const { redisClient } = require("./redisConnection");

class RedisAuthenticationService extends AbstractRedisClient {
  jwtHashName = "activeJWTClient";
  constructor(redisClient) {
    super(redisClient);
  }

  signJWT({ id }) {
    const claims = {
      id,
    };
    return jwt.sign(claims, authConfig.secret, {
      expiresIn: authConfig.tokenExpiryTime,
    });
  }

  decodeJWT(token) {
    return jwt.verify(token, authConfig.secret);
  }

  createRefreshToken() {
    return randToken.uid(256);
  }

  constructKey(id, refreshToken) {
    return `refresh-${refreshToken}.${this.jwtHashName}.${id}`;
  }

  async addToken(id, refreshToken, token) {
    await this.checkConnection();
    return this.client.set(this.constructKey(id, refreshToken), token);
  }

  async isRefreshTokenExist(refreshToken) {
    await this.checkConnection();
    const keys = await this.client.keys(`*${refreshToken}*`);
    return keys.length != 0;
  }

  async getIdFromRefreshToken(refreshToken) {
    await this.checkConnection();
    const keys = await this.client.keys(`*${refreshToken}*`);
    const isKeyExist = keys.length != 0;

    if (!isKeyExist) {
      throw new Error("Can not found this refresh token in db.");
    }
    const key = keys[0];
    return key.substring(
      key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1
    );
  }

  // async saveAuthenticateUser(user) {
  //   await this.checkConnection();
  //   await this.addToken(user.email.value, user.refreshToken, user.accessToken);
  // }

  async deAuthenticateUser(id) {
    await this.clearAllSession(id);
  }

  async clearAllSession(id) {
    await this.checkConnection();
    const keys = await this.client.keys(`*${this.jwtHashName}.${id}`);
    return Promise.all(keys.map((key) => this.client.del(key)));
  }

  async isSessionExist(id, refreshToken) {
    const token = await this.getToken(id, refreshToken);
    return !!token;
  }

  async getToken(id, refreshToken) {
    await this.checkConnection();
    return await this.client.get(this.constructKey(id, refreshToken));
  }

  async clearToken(id, refreshToken) {
    await this.checkConnection();
    return await this.client.del(this.constructKey(id, refreshToken));
  }

  async getTokens(id) {
    await this.checkConnection();
    return await this.client.keys(`*${this.jwtHashName}.${id}`);
  }

  async countSessions(id) {
    await this.checkConnection();
    const keys = await this.client.keys(`*${this.jwtHashName}.${id}`);
    return keys.length;
  }
  async countTokens() {
    await this.checkConnection();
    const keys = await this.client.keys(`*${this.jwtHashName}*`);
    return keys.length;
  }
}

module.exports = redisAuthService = new RedisAuthenticationService(redisClient);
