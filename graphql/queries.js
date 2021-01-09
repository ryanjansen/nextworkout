import { gql } from "graphql-request";
const getExercisesQuery = gql`
  query {
    allExercises {
      data {
        user {
          _id
        }
        _id
        name
        category
        bodypart
      }
    }
  }
`;

const getUser = (authSub) => {
  const query = gql`
    query getUser($authSub: String!) {
      getUserByAuthSub(authSub: $authSub) {
        _id
      }
    }
  `;

  const variables = {
    authSub,
  };

  return { query, variables };
};

const getWorkoutsByUser = (userID) => {
  const query = gql`
    query getWorkoutsByUser($userID: ID!) {
      findUserByID(id: $userID) {
        workouts {
          data {
            name
            _id
            exercises {
              exerciseData
              name
              sets {
                reps
                weight
              }
            }
          }
        }
      }
    }
  `;

  const variables = { userID };

  return { query, variables };
};

const getCompletedWorkoutsByUser = (userID) => {
  const query = gql`
    query getCompletedWorkoutsByUser($userID: ID!) {
      findUserByID(id: $userID) {
        completedWorkouts {
          data {
            name
            date
            timeTaken
            exercises {
              name
              sets {
                reps
                weight
              }
            }
            _id
          }
        }
      }
    }
  `;

  const variables = { userID };

  return { query, variables };
};
export {
  getCompletedWorkoutsByUser,
  getUser,
  getExercisesQuery,
  getWorkoutsByUser,
};
