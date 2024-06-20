const cors = require("cors");

const { graphQLAPIHandler } = require("./graphQL/graphQLAPI")

function initAPIs(server) {
  server.all(
    "/graphql",
    cors({ origin: 'http://localhost:3000' }),
    graphQLAPIHandler
  );
}

module.exports.initAPIs = initAPIs
