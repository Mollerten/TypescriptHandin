const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  
  type Pet {
  id: ID!
  name: String!
  species: String!
  age: Int!
  owner: Owner!
  imageUrl: String
}

  type Login {
    success: Boolean!
    message: String!
    token: String!
    }

type Owner {
  id: ID!
  name: String!
  age: Int!
  pets: [Pet!]!
  comments: [Comment!]!
  blogposts: [Blogpost!]!
  email: String!
  password: String!
}

type Blogpost {
  id: ID!
  title: String!
  content: String!
  owner: Owner!
  comments: [Comment!]
  imageurl: String
}

type Comment {
  id: ID!
  content: String!
  blogpost: Blogpost!
  owner: Owner!
}

input PetInput {
  name: String!
  species: String!
  age: Int!
  ownerId: ID!
}

input OwnerInput {
  name: String!
  age: Int!
  email: String!
  password: String!
}

input CommentInput {
  content: String!
  blogpostId: ID!
  ownerId: ID!
}

input BlogpostInput {
  title: String!
  content: String!
  imageurl: String
  ownerId: ID!
}

input LoginInput {
  email: String!
  password: String!
}

type Query {
  pets: [Pet!]!
  owners: [Owner!]!
  owner(id: ID): Owner
  blogposts: [Blogpost!]!
  comments: [Comment!]!
  blogpost(id: ID): Blogpost
    comment(id: ID): Comment
    pet(id: ID): Pet
    
}

type Mutation {
  createPet(input: PetInput!): Pet
  createOwner(input: OwnerInput!): Owner
  createBlogpost(input: BlogpostInput!): Blogpost
  createComment(input: CommentInput!): Comment
  updateOwner(id: ID!, input: OwnerInput!): Owner
  updatePet(id: ID!, input: PetInput!): Pet
  updateBlogpost(id: ID!, input: BlogpostInput!): Blogpost
  updateComment(id: ID!, input: CommentInput!): Comment
  deleteOwner(id: ID!): Boolean
  deletePet(id: ID!): Boolean
  deleteBlogpost(id: ID!): Boolean
  deleteComment(id: ID!): Boolean
  login(input: LoginInput!) : Login
}

`;

export default typeDefs;