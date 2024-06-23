const express = require("express");
const cors = require("cors");

const { RaMGraphQLProxyAPIHandler } = require("./RaMGraphQLProxyAPI");
const { UsersGraphQLHandler } = require("./UsersGraphQLHandler");

function initAPIs(server, redisClient) {
  server.use(express.json())

  server.all(
    "/graphql/ramproxy",
    cors({ origin: 'http://localhost:3000' }),
    RaMGraphQLProxyAPIHandler(redisClient),
  );

  server.all(
    "/graphql/users",
    cors({ origin: 'http://localhost:3000' }),
    UsersGraphQLHandler(redisClient),
  )
}

module.exports.initAPIs = initAPIs
