const express = require("express");
const cors = require("cors");

const { RaMGraphQLProxyAPIHandler } = require("./RaMGraphQLProxyAPI");

function initAPIs(server) {
  server.use(express.json())

  server.all(
    "/graphql/ramproxy",
    cors({ origin: 'http://localhost:3000' }),
    RaMGraphQLProxyAPIHandler,
  );
}

module.exports.initAPIs = initAPIs
