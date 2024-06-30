const express = require("express");

const { initAPIs } = require("./api/api");
const { initRedis } = require("./redis/redis");
const { config } = require("./config");

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));

async function startServer() {
  try {
    console.info('Server starting...');

    const server = express();

    const redisClient = await initRedis();
    console.info('Redis initialized.');

    initAPIs(server, redisClient);
    console.info('APIs initialized.');

    server.listen(config.SERVER_PORT);

    console.info(`Server running at port: ${config.SERVER_PORT}.`);
  } catch(err) {
    console.error('Server initialization failed. Server shuting down...', err);

    throw new Error('Server initialization failed', { cause: err });
  }
}

startServer();
