import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const mongoose = require('mongoose');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Book {
    title: String
    author: String
  }

  type Person {
    id: ID!
    name: String!
    email: String!
    age: Int
    address: String
    phone: String
  }

  type Query {
    books: [Book]
    hello: String
    person(id: ID!): Person
    people: [Person]
  }
  
   type Mutation {
    createPerson(
      name: String!
      age: Int!
      email: String!
      address: String!
      phone: String!
    ): Person
    updatePerson(
      id: ID!
      name: String!
      age: Int!
      email: String!
      address: String!
      phone: String!
    ): Person
    deletePerson(id: ID!): Person
  }
    type Subscription {
    personCreated: Person
    personUpdated: Person
    personDeleted: Person
  }

`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const users = [
    {
        id: '1',
        name: 'John Doe',
        email: '',
        age: 25,
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: '',
        age: 30,
    },
    {
        id: '3',
        name: 'John Smith',
        email: '',
        age: 35,
    },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        hello: () => 'Hello world!',
        people: () => users,
        person: (parent: any, args: any, context: any, info: any) => {
            return users.find((user) => user.id === args.id);
        },
    },

    Mutation: {
        createPerson: (parent: any, args: any, context: any, info: any) => {
            const { name, age, email, address, phone } = args;
            const newPerson = {
                id: generateUniqueID(), // Assuming you have a function to generate a unique ID
                name,
                age,
                email,
                address,
                phone,
            };
            users.push(newPerson);
            return newPerson;
        },
        updatePerson: (parent: any, args: any, context: any, info: any) => {
            const { id, name, age, email, address, phone } = args;
            const updatedPerson = users.find((user: any) => user.id === id);
            if (!updatedPerson) {
                throw new Error('Person not found');
            }
            updatedPerson.name = name;
            updatedPerson.age = age;
            updatedPerson.email = email;
            updatedPerson.address = address;
            updatedPerson.phone = phone;
            return updatedPerson;
        },
        deletePerson: (parent: any, args: any, context: any, info: any) => {
            const { id } = args;
            const index = users.findIndex((user: any) => user.id === id);
            if (index === -1) {
                throw new Error('Person not found');
            }
            const deletedPerson = users.splice(index, 1)[0];
            return deletedPerson;
        },
    },
};

const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB, {
}).then(() => console.log('DB connection successful!'));



async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
    const {url} = await startStandaloneServer(server, {
        listen: {port: 4000},
    });

    console.log(`🚀  Server ready at: ${url}`);
}

    startServer().catch((err) => {
        console.error('Error starting the server:', err);
    });
