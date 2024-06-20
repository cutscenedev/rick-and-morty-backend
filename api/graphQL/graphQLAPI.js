const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello() {
    return "Hello world!"
  },
};

const graphQLAPIHandler = createHandler({
  schema: schema,
  rootValue: root,
})

module.exports.graphQLAPIHandler = graphQLAPIHandler;
