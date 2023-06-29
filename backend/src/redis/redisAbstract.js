class AbstractRedisClient {
  tokenExpiryTime = 604800;
  client;

  constructor(client) {
    this.client = client;
  }

  async getOne(key) {
    await this.checkConnection();
    return await this.client.get(key);
  }

  async set(key, value) {
    await this.checkConnection();
    return await this.client.set(key, value);
  }

  async deleteOne(key) {
    await this.checkConnection();
    return await this.client.del(key);
  }
  async checkConnection(dbNumber = 0) {
    if (!this.client.isOpen && !this.client.isReady) {
      await this.client.connect();
    }
    await this.client.select(dbNumber);
  }
}

module.exports = AbstractRedisClient;
