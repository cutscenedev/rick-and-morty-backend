const express = require("express");

const { initAPIs } = require("./api/api");
const { initRedis } = require("./redis/redis");

async function startServer() {
  try {
    console.info('Server starting...');

    const server = express();

    const redisClient = await initRedis();
    console.info('Redis initialized.');

    initAPIs(server, redisClient);
    console.info('APIs initialized.');

    server.listen(4000);

    console.info('Server started.');
  } catch (err) {
    console.error('Server initialization failed. Server shuting down...', err);

    throw err;
  }
}

startServer();
