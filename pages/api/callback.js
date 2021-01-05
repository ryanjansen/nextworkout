import auth0 from "../../utils/auth0";
import { getUser } from "../../graphql/queries";
import GraphQLClient from "../../utils/graphQLClient";
import { createUser } from "../../graphql/mutations";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        //get user from faunaDB
        const { query, variables } = getUser(session.user.sub);
        const faunaUser = await GraphQLClient.request(query, variables);
        if (faunaUser.getUserByAuthSub) {
          // If user exists, get user id and place within session
          return {
            ...session,
            user: {
              ...session.user,
              userID: faunaUser.getUserByAuthSub._id,
            },
          };
        } else {
          // if not, create user
          const { mutation, variables } = createUser(
            session.user.sub,
            session.user.nickname,
            session.user.name
          );
          const newUser = await GraphQLClient.request(mutation, variables);
          return {
            ...session,
            user: { ...session.user, userID: newUser.createUser._id },
          };
        }
      },
      redirectTo: "/",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
