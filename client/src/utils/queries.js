import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      username
      email
      savedExercises {
        _id
        title
        instructions
        exerciseId
        equipment
        image
      }
    }
  }
`;