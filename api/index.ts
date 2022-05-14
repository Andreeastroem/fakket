const cors = require("micro-cors")(); // highlight-line
const { ApolloServer, gql } = require("apollo-server-micro");
const { send } = require("micro");

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello() {
      return "Hello World!";
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler();
  return cors((req: Request, res: Response) =>
    req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res)
  );
});
