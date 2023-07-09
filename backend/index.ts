import express from 'express';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import { createServer } from "@graphql-yoga/node";

import companyTypes from "domains/company/graphql/index";
import companyResolver from "domains/company/resolvers/index";

const executableSchema = makeExecutableSchema({
  typeDefs: [companyTypes],
  resolvers: mergeResolvers([companyResolver]),
});

const app = express()

const yoga = createYoga({ schema: executableSchema })

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga)

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
})
