const express = require("express");
const cors = require("cors");

const { RaMGraphQLProxyAPIHandler } = require("./RaMGraphQLProxyAPI");

function initAPIs(server, redisClient) {
  server.use(express.json())

  server.all(
    "/graphql/ramproxy",
    cors({ origin: 'http://localhost:3000' }),
    RaMGraphQLProxyAPIHandler(redisClient),
  );
}

module.exports.initAPIs = initAPIs
