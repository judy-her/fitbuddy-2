const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedExercises: [Exercise]
    excerciseCount: Int
  }

  type Exercise {
    _id: ID
    name: String
    bodyPart: String
    equipment: String
    gifUrl: String
    instructions: [String]!
    title: [String]!
  }

  type Category {
    _id: ID
    name: String
    exercises: [Exercise]
  } 

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user: User
    exercise(_id: ID!) : Exercise
    exercises(categoryID: ID, name: String) :[Exercise]
    category(_id: ID!): Category
    categories: [Category]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveExercise(exerciseId: String!, name: String!, bodyPart: String!, equipment: String!, instructions: [String], gifUrl: String, secondaryMuscles: [String], target: String!): Exercise
    deleteExercise(id: ID!): Boolean
  }
`;

module.exports = typeDefs;