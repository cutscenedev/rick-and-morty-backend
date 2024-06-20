const express = require("express");
const { initAPIs } = require("./api/api");

const server = express();

initAPIs(server)

server.listen(4000);

console.log("Server started");
