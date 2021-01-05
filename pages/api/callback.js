import CookieSessionStoreSettings from "@auth0/nextjs-auth0/dist/session/cookie-store/settings";
import auth0 from "../../utils/auth0";
import { getUser } from "../../graphql/queries";
import GraphQLClient from "../../utils/graphQLClient";
import { get } from "react-hook-form";
import { createUser } from "../../graphql/mutations";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        const { query, variables } = getUser(jsession.user.sub);
        const faunaUser = await GraphQLClient.request(query, variables);
        if (faunaUser.getUserByAuthSub) {
          return {
            ...session,
            user: {
              ...session.user,
              userID: faunaUser.getUserByAuthSub._id,
            },
          };
        } else {
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
