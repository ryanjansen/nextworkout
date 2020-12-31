import GraphQLClient from "../utils/graphQLClient";
import useSWR from "swr";
import { gql } from "graphql-request";

export default function GetExercises() {
  const fetcher = async (query) => await GraphQLClient.request(query);

  const { data, error } = useSWR(
    gql`
      query GetExercises {
        exercises {
          data {
            _id
            name
            category
            bodypart
          }
        }
      }
    `,
    fetcher
  );

  return { data, error };
}
