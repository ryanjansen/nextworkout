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

export { getUser, getExercisesQuery };
