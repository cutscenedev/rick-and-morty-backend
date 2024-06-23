const { createClient } = require("redis");

async function initRedis() {
  const client = createClient();

  client.on('error', err => console.error('Redis Client Error', err));

  await client.connect();

  return client;
}

module.exports.initRedis = initRedis;
