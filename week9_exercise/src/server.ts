import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
// import { startStandaloneServer } from 'apollo-server-standalone';
import mongoose from 'mongoose';

const Person = require('../models/personModel');
const Address = require('../models/addressModel');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

 
 type Address {
  id: ID!
  street: String!
  city: String!
  persons: [Person!]!
}

type Person {
  id: ID!
  name: String!
  email: String!
  age: Int
  address: Address
  phone: String
  imageUrl: String
}

type Query {
  hello: String
  person(id: ID!): Person
  people: [Person]
  address(id: ID!): Address
  addresses: [Address]
}

type Mutation {
  createPerson(
    name: String!
    age: Int!
    email: String!
    phone: String!
  ): Person

  updatePerson(
    id: ID!
    name: String!
    age: Int!
    email: String!
    phone: String!
  ): Person

  deletePerson(id: ID!): Person
  
  addAddressToPerson(
    personId: ID!
    addressId: ID!
    ): Person
    
  removeAddressFromPerson(
    personId: ID!
    addressId: ID!
    ): Person
    

  createAddress(
    street: String!
    city: String!
  ): Address

  updateAddress(
    id: ID!
    street: String!
    city: String!
  ): Address

  deleteAddress(id: ID!): Address
}

type Subscription {
  personCreated: Person
  personUpdated: Person
  personDeleted: Person
}



`;

// Resolvers define how to fetch the types defined in your schema.

const resolvers = {
    Query: {
        person: async (parent: any, args: any) => {
            const { id } = args;
            try {
                const person = await Person.findById(id).populate('address');
                return person;
            } catch (error) {
                console.error('Error fetching person:', error);
                throw new Error('Failed to fetch person');
            }
        },
        people: async () => {
            try {
                const people = await Person.find().populate('address');
                return people;
            } catch (error) {
                console.error('Error fetching people:', error);
                throw new Error('Failed to fetch people');
            }
        },
        address: async (parent: any, args: any) => {
            const { id } = args;
            try {
                const address = await Address.findById(id).populate('person');
                return address;
            } catch (error) {
                console.error('Error fetching address:', error);
                throw new Error('Failed to fetch address');
            }
        },
        addresses: async () => {
            try {
                const addresses = await Address.find();
                return addresses;
            } catch (error) {
                console.error('Error fetching addresses:', error);
                throw new Error('Failed to fetch addresses');
            }
        },
    },
    Mutation: {
        createPerson: async (parent: any, args: any) => {
            const { name, age, email, phone } = args;
            try {
                const imageUrl = `https://robohash.org/${name}.png`;
                const createdPerson = await Person.create({ name, age, email, imageUrl, phone });
                return createdPerson;
            } catch (error) {
                console.error('Error creating person:', error);
                throw new Error('Failed to create person');
            }
        },
        updatePerson: async (parent: any, args: any) => {
            const { id, name, age, email, phone } = args;
            try {
                const updatedPerson = await Person.findByIdAndUpdate(
                    id,
                    { name, age, email, phone },
                    { new: true }
                );
                return updatedPerson;
            } catch (error) {
                console.error('Error updating person:', error);
                throw new Error('Failed to update person');
            }
        },
        deletePerson: async (parent: any, args: any) => {
            const { id } = args;
            try {
                const deletedPerson = await Person.findByIdAndDelete(id);
                return deletedPerson;
            } catch (error) {
                console.error('Error deleting person:', error);
                throw new Error('Failed to delete person');
            }
        },

        createAddress: async (parent: any, args: any) => {
            const { street, city } = args;
            try {
                const createdAddress = await Address.create({ street, city });
                return createdAddress;
            } catch (error) {
                console.error('Error creating address:', error);
                throw new Error('Failed to create address');
            }
        },
        updateAddress: async (parent: any, args: any) => {
            const { id, street, city } = args;
            try {
                const updatedAddress = await Address.findByIdAndUpdate(
                    id,
                    { street, city },
                    { new: true }
                );
                return updatedAddress;
            } catch (error) {
                console.error('Error updating address:', error);
                throw new Error('Failed to update address');
            }
        },
        deleteAddress: async (parent: any, args: any) => {
            const { id } = args;
            try {
                const deletedAddress = await Address.findByIdAndDelete(id);
                return deletedAddress;
            } catch (error) {
                console.error('Error deleting address:', error);
                throw new Error('Failed to delete address');
            }
        },

        addAddressToPerson: async (parent: any, { personId, addressId }: any) => {
            try {
                const person = await Person.findById(personId);
                const address = await Address.findById(addressId);

                if (!person || !address) {
                    throw new Error('Person or address not found');
                }

                person.address = address;
                await person.save();
                return person;

            } catch (error) {
                console.error('Error adding address to person:', error);
                throw new Error('Failed to add address to person');
            }
        },

        removeAddressFromPerson: async (parent: any, { personId, addressId }: any) => {
            // We don't need to find the address because we're not updating it
            // However we will keep it in case we want to do something with it later
            try {
                // Find the person and address by their respective IDs
                const person = await Person.findById(personId);
                const address = await Address.findById(addressId);

                if (!person || !address) {
                    throw new Error('Person or address not found');
                }

                // address.persons = address.persons.filter(
                //     (person: any) => person.toString() !== personId
                // );

                person.address = null;
                await person.save();
                return person;
            } catch (error) {
                console.error('Error removing person from address:', error);
                throw new Error('Failed to remove person from address');
            }
        },



    },


    Subscription: {
        // Subscription resolvers...
    },
};

// const DB = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_DEV, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,

);
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch((error: any) => console.error('DB connection error:', error));



// async function startServer() {
//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//     });
//
//     const {url} = await startStandaloneServer(server, {
//         listen: {port: 4000},
//     });
//
//     console.log(`🚀  Server ready at: ${url}`);
// }

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await server.listen(4000);
    console.log(`🚀 Server ready at: ${url}`);
}

    startServer().catch((err) => {
        console.error('Error starting the server:', err);
    });
