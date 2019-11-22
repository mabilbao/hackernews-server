const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./generated/prisma-client')

async function main() {

  // Create a new link
  const newLink = await prisma.createLink({ 
    url: 'www.prisma.io',
    description: 'Prisma replaces traditional ORMs',
  })
  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`)

  // Read all links from the database and print them to the console
  const allLinks = await prisma.links()
  console.log(allLinks)
}

main().catch(e => console.error(e))


let links = [
  {
    id: "link-0",
    description: "Fullstack tutorial for GraphQL",
    url: "www.howtographql.com",
  }
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
        return links.find((l) => l.id === args.id)
    } 
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    update: (parent, args) => {
        let link = links.find(l => l.id === args.id)
        if (link) {
            link.url = args.url || link.url
            links.description = args.description || link.description
        }
        return link
    },
    delete: (parent, args) => {
        let index = links.findIndex(l => l.id === args.id)
        if (index !== -1) {
            let link = links[index]
            links.splice(index, 1)
            return link
        }
        return null
    }
  },
//   Link: {
//     id: parent => parent.id,
//     description: parent => parent.description,
//     url: parent => parent.url
//   }
};

typeDefs = "./src/schema.graphql";

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
