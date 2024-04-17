const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedExercises: [Exercise]
    exerciseCount: Int
  }

  type Exercise {
    _id: ID
    title(author): String!
    description: String!
    exerciseId: String!
    image: String
    link: String
  }

  type Category {
    _id: ID
    name: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    users: [User!]
    exercise(_id: ID!) : Exercise
    
    exercises(categoryID: ID, name: String) :[Exercise]
    category(ID:ID!): Category!
    
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    saveExercise(exerciseId: String!, title: String!, description: String!, image: String, link: String): User


    deleteExercise(exerciseId: String!): User
  }
`;

module.exports = typeDefs;
