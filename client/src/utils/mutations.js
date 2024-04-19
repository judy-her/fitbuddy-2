import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercise($categoryName: String!, $exerciseId: String!, $title: String!, $instructions: [String]!, $equipment: [String], $image: String) {
    saveExercise(categoryName:$categoryName, exerciseId: $exerciseId, title: $title, instructions: $instructions, equipment:$equipment, image: $image) {
      _id
      title
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(id: $id) 
  }
`;