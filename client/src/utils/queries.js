import { gql } from '@apollo/client';

// Define QUERY_USER query using gql
export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      password
      savedExercises {
        _id
        title
        description
        exerciseId
        equipment
        image
        category {
          _id
          name
        }
      }
      exerciseCount
    }
  }
}
`;

// Define QUERY_EXERCISE query using gql
export const QUERY_EXERCISE = gql`
  query exercise($_id: ID!) {
    exercise(_id: $_id) {
      _id
      title
      description
      exerciseId
      equipment
      image
      category {
        _id
        name
      }
    }
  }
`;

// Define QUERY_CATEGORY query using gql
export const QUERY_CATEGORY = gql`
  query category($_id: ID!) {
    category(_id: $_id) {
      _id
      name
      exercises {
        _id
        title
        description
        exerciseId
        equipment
        image
      }
    }
  }
`;
// export const QUERY_USER = gql`
//   query user {
//     user {
//       username
//       email
//       bookCount
//       savedBooks {
//         authors
//         description
//         bookId
//         title
//         image
//         link
//       }
//     }
//   }
// `;
