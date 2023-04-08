require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const { resolvers, typeDefs, permissions } = require("./modules");
const isAuth = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(isAuth);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 200000000000000000, maxFiles: 3 }),
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: applyMiddleware(schema, permissions),
    graphiql: true,
    context: {
      user: request.user || null,
    },
  }))
);

exports.app = app;
