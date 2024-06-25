const express = require("express");
const cors = require("cors");

const { RaMGraphQLProxyAPIHandler } = require("./RaMGraphQLProxyAPI");
const { UsersGraphQLHandler } = require("./UsersGraphQLHandler");
const { config } = require("../config");

function initAPIs(server, redisClient) {
  server.use(express.json())

  server.all(
    "/graphql/ramproxy",
    cors({ origin: config.CLIENT_ORIGIN }),
    RaMGraphQLProxyAPIHandler(redisClient),
  );

  server.all(
    "/graphql/users",
    cors({ origin: config.CLIENT_ORIGIN }),
    UsersGraphQLHandler(redisClient),
  )
}

module.exports.initAPIs = initAPIs
