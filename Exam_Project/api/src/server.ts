import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
// The following 2 imports are for reliable shutdown of the server.
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
// import { startStandaloneServer } from '@apollo/server/standalone';
import body_parser_pkg from 'body-parser'; // import { json } from 'body-parser' gave error.
const { json } = body_parser_pkg;
import express from 'express';
import cors from 'cors';
import typeDefs from './graphql_schemas';
import Mutation from './resolvers/mutation';
import Query from './resolvers/query';
import Owner from './resolvers/owner';
import Comment from './resolvers/comment';
import Blogpost from './resolvers/blogpost';
import OwnerModel from './models/ownerModel';
import PetModel from './models/petModel';
import BlogpostModel from './models/blogpostModel';
import CommentModel from './models/commentModel';
import Pet from "./resolvers/pet";
import { pets, owners, blogposts, comments } from './data';
import usersRouter from './routes/users';
import * as mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB, {
}).then(() => console.log('DB connection successful!'));

const app = express();

interface MyContext {
  pets: typeof pets;
  owners: typeof owners;
  blogposts: typeof blogposts;
  comments: typeof comments;
  OwnerModel: typeof OwnerModel;
  PetModel: typeof PetModel;
  BlogpostModel: typeof BlogpostModel;
  CommentModel: typeof CommentModel;
}


const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Owner,
    Pet,
    Blogpost,
    Comment,



  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// ApolloServerPluginDrainHttpServer is a plugin that will drain the httpServer when the ApolloServer is stopped. This is useful for ensuring that the server is not kept alive by the Node.js event loop. It is not necessary to use this plugin if we are using a different HTTP server, such as Express or Apollo Standalone Server: https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/.


await server.start();

app.use('/graphql',
cors<cors.CorsRequest>(),
json(),
expressMiddleware(server, {
  context: async() => ({
  pets, owners, blogposts, comments, OwnerModel, PetModel, BlogpostModel, CommentModel
})},
)
);

// top level await is now supported since typescript 3.8
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 GraphQL Server ready at http://localhost:4000/graphql`);

app.use('/api/users', usersRouter);
console.log(`🚀 Users API ready at http://localhost:4000/api/users`);

app.get('*', function(req, res){
  res.send({ status: 404, message: 'Ressource not found' });
});

