import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import glob from 'glob-promise';

const port = 8080;

const server = express();
server.use(cookieParser());
server.use(cors());
server.options('*', cors());

// Init apollo server
const initApollo = async () => {
  const files = await glob.promise(`${__dirname}/../../common/schema/**/*.gql`);
  const typeDefs = await Promise.all(
    files.map((p: any) => fs.promises.readFile(p).then(f => f.toString())),
  );
  const resolvers = glob
    .sync(`${__dirname}/**/*.resolver.ts`)
    .map((myPath: any) => require(myPath));
  const apolloServer = new ApolloServer({
    formatError: err => {
      return err;
    },
    engine: {},
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    context: async ({ req, res, connection }) => {
      if (connection) {
        return connection.context;
      } else {
        return { req, res };
      }
    },
  });

  return apolloServer;
};
const apolloInitter = initApollo();

console.log(`Preparing app`);
// Init all routes once nextjs loads
void Promise.resolve().then(async () => {
  const apolloServer = await apolloInitter;
  apolloServer.applyMiddleware({ app: server });
  console.log(`Apollo server loaded!`);
});

server.listen(port, () => console.log(`App listening on port ${port}!`));
