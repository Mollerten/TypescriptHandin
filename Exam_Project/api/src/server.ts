import { ApolloServer } from 'apollo-server';
import mongoose from "mongoose";
import dotenv from 'dotenv';

import typeDefs from './graphql_schemas';
import Mutation from './resolvers/mutation';
import Query from './resolvers/query';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch((error: any) => console.error('DB connection error:', error));

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
  });

  const { url } = await server.listen({port:4000});
  console.log(`🚀 Server ready at: ${url}`);


}

startServer().catch((err) => {
  console.error('Error starting the server:', err);
});


// const httpServer = http.createServer(app);
//
// const server = new ApolloServer({
//   typeDefs,
//   resolvers: {
//     Query,
//     Mutation,
//   },
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });
// // ApolloServerPluginDrainHttpServer is a plugin that will drain the httpServer when the ApolloServer is stopped. This is useful for ensuring that the server is not kept alive by the Node.js event loop. It is not necessary to use this plugin if we are using a different HTTP server, such as Express or Apollo Standalone Server: https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/.
//
//
// await server.start();
//
// app.use('/graphql',
// cors<cors.CorsRequest>(),
// json(),
// expressMiddleware(server, {
//   context: async() => ({
//   pets, owners, blogposts, comments, OwnerModel, PetModel, BlogpostModel, CommentModel
// })},
// )
// );
//
// // top level await is now supported since typescript 3.8
// await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 GraphQL Server ready at http://localhost:4000/graphql`);
//
// app.use('/api/users', usersRouter);
// console.log(`🚀 Users API ready at http://localhost:4000/api/users`);
//
// app.get('*', function(req, res){
//   res.send({ status: 404, message: 'Ressource not found' });
// });
//
