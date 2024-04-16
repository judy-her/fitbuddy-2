const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

 // REFACTOR-CODE 

//   type Exercise {
//     _id: ID
//     authors: [String]
//     description: String!
//     bookId: String!
//     image: String
//     link: String
//     title: String!
//   }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    // REFACTOR-CODE
    // saveExercise(bookId: String!, title: String!, description: String!, authors: [String], image: String, link: String): User
    // deleteExercise(bookId: String!): User
  }
`;

module.exports = typeDefs;