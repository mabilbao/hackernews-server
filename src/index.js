const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Vote = require('./resolvers/Vote')

const typeDefs = "./src/schema.graphql";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote
}

const context = request => {
  return  {
    ...request,
    prisma
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
