const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const cors = require('cors')


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    hello2: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello, GraphQL!',
  hello2: () => 'Hello2, GraphQL!',
};


var app = express()
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphQL for testing the API in the browser
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")