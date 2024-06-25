const { createClient } = require("redis");
const { config } = require("../config");

async function initRedis() {
  const client = createClient({
    socket: {
      host: config.REDIS.HOST,
      port: config.REDIS.PORT,
    },
  });

  client.on('error', err => console.error('Redis Client Error', err));

  await client.connect();

  return client;
}

module.exports.initRedis = initRedis;
