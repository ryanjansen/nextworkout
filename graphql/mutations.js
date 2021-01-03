import { gql } from "graphql-request";

const createUser = (user, email) => {
  const mutation = gql`
    mutation AddUser($user: String!, $email: String!) {
      createUser(data: { username: $user, email: $email }) {
        _id
        username
        email
      }
    }
  `;

  const variables = { user, email };

  return { mutation, variables };
};

const createExercise = (userID, name, category, bodypart) => {
  const mutation = gql`
    mutation AddExercise(
      $userID: ID!
      $name: String!
      $category: String!
      $bodypart: String!
    ) {
      createExerciseData(
        data: {
          user: { connect: $userID }
          name: $name
          category: $category
          bodypart: $bodypart
        }
      ) {
        _id
        user {
          _id
          username
        }
        name
        category
        bodypart
      }
    }
  `;

  const variables = { userID, name, category, bodypart };

  return { mutation, variables };
};

// const createWorkout = (name, userID, )
export { createUser, createExercise };
