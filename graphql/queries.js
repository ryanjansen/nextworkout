import { gql } from "graphql-request";
const getExercisesQuery = gql`
  query {
    allExercises {
      data {
        _id
        name
        category
        bodypart
      }
    }
  }
`;

export { getExercisesQuery };
