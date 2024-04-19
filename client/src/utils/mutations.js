import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation saveExercise($exerciseId: String!, $name: String!, $bodyPart: String!, $equipment: String!, $instructions: [String], $gifUrl: String, $secondaryMuscles: [String], $target: String!) {
    saveExercise(exerciseId: $exerciseId, name: $name, bodyPart: $bodyPart, equipment: $equipment, instructions: $instructions, gifUrl: $gifUrl, secondaryMuscles: $secondaryMuscles, target: $target) {
      _id
      name
      bodyPart
      equipment
      gifUrl
    }
  }
`;


export const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(id: $id) 
  }
`;