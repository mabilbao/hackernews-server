const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./generated/prisma-client')

const typeDefs = "./src/schema.graphql";

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  },
}

const context = {
  prisma
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
