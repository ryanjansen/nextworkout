import { gql } from "graphql-request";

const createUser = (authSub, user, email) => {
  const mutation = gql`
    mutation AddUser($authSub: String!, $user: String!, $email: String!) {
      createUser(data: { authSub: $authSub, username: $user, email: $email }) {
        _id
        username
        email
      }
    }
  `;

  const variables = { authSub, user, email };

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

const createWorkout = (name, userID, eList) => {
  const mutation = gql`
    mutation AddWorkout(
      $name: String!
      $userID: ID!
      $exerciseList: [ExerciseInput!]!
    ) {
      createWorkout(
        data: {
          name: $name
          user: { connect: $userID }
          exercises: $exerciseList
        }
      ) {
        _id
        name
        user {
          _id
          username
        }
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
  `;

  const exerciseList = eList.map((exercise) => {
    const result = {
      exerciseData: exercise.exercise._id,
      name: exercise.exercise.name,
      sets: exercise.sets,
    };
    return result;
  });

  console.log(exerciseList);

  const variables = {
    name,
    userID,
    exerciseList,
  };

  return { mutation, variables };
};

const deleteExercise = (exerciseID) => {
  const mutation = gql`
    mutation deleteExercise($exerciseID: ID!) {
      deleteExerciseData(id: $exerciseID) {
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
  const variables = { exerciseID };

  return { mutation, variables };
};

const createCompletedWorkout = (
  name,
  userID,
  workoutID,
  date,
  timeTaken,
  exerciseList
) => {
  const mutation = gql`
    mutation createCompletedWorkout(
      $name: String!
      $userID: ID!
      $workoutID: ID!
      $date: Date!
      $timeTaken: Int!
      $exerciseList: [ExerciseInput!]!
    ) {
      createCompletedWorkout(
        data: {
          name: $name
          user: { connect: $userID }
          workout: { connect: $workoutID }
          date: $date
          timeTaken: $timeTaken
          exercises: $exerciseList
        }
      ) {
        _id
        workout {
          user {
            _id
            username
          }
        }
      }
    }
  `;
  const variables = { name, exerciseList, userID, workoutID, date, timeTaken };

  return { mutation, variables };
};

const deleteWorkout = (workoutID) => {
  const mutation = gql`
    mutation deleteWorkout($workoutID: ID!) {
      deleteWorkout(id: $workoutID) {
        _id
        name
        user {
          _id
          username
        }
      }
    }
  `;
  const variables = { workoutID };

  return { mutation, variables };
};

export {
  deleteWorkout,
  createCompletedWorkout,
  deleteExercise,
  createUser,
  createExercise,
  createWorkout,
};
