import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import resolvers from './modules';
import { PORT, API_URI } from './config';

const main = async (): Promise<void> => {
  await createConnection();

  const schema = await buildSchema({ resolvers });

  const app = express();

  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });

  app.listen({ port: PORT, path: API_URI }, () =>
    console.log(`🚀 Server started at http://localhost:${PORT}${API_URI}`),
  );
};

main();
