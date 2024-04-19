const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedExercises: [Exercise]
    exerciseCount: Int
  }

  type Exercise {
    _id: ID
    title: String
    instructions: [String]
    exerciseId: String
    equipment:[String]
    image: String
  }

  type Category {
    _id: ID
    name: String
    exercises: [Exercise]
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]

    exercise(_id: ID!) : Exercise
    exercises(categoryID: ID, name: String) :[Exercise]

    category(ID:ID): Category
    categories: [Category]
    
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    saveExercise(categoryName:String!, exerciseId: String!, title: String!, instructions: [String]!, equipment:[String], image: String): Exercise

    deleteExercise(id: ID!): Boolean
  }
`;

module.exports = typeDefs;