import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        title
        image
        link
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query {
    fetchCategories {
      id
      name
      description
      bodyPart
      gifUrl
    }
  }
`;

export const QUERY_EXERCISES_BY_CATEGORIES = gql`
  query {
    fetchExercisesByCategory(bodyType: $bodyType) {
      id
      name
      description
      bodyPart
      gifUrl
    }
  }
`;