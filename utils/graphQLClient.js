import { GraphQLClient } from "graphql-request";

const endpoint = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET}`,
  },
});

async function main() {
  const mutation = gql`
    mutation AddWorkout(
      $userID: ID!
      $name: String!
      $exerciseList: [ExerciseInput]
    ) {
      createWorkout(
        data: {
          name: $name
          user: { connect: $userID }
          exercises: { create: $exerciseList }
        }
      ) {
        _id
        name
        user {
          _id
        }
        exercises {
          data {
            exerciseData {
              _id
              name
              category
              bodypart
            }
            sets {
              reps
              weight
            }
          }
        }
      }
    }
  `;
}

export default graphQLClient;
