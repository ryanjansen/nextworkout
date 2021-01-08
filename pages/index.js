import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import auth0 from "../utils/auth0";
import Layout from "../components/layout";
import { Text, Grid, GridItem } from "@chakra-ui/react";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <Head>
        s<title>Next Workout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user && (
          <>
            <Grid
              padding={4}
              h={{ base: "2xl", md: "xl", lg: "xl" }}
              autoRows="15rem"
              templateColumns="repeat(6, 1fr)"
              gap={4}
            >
              <GridItem
                boxShadow="1px 1px 1px 1px black"
                borderRadius="5px"
                rowSpan={1}
                colSpan={{ base: 6, md: 3, lg: 4 }}
              >
                <Text
                  textAlign="right"
                  fontSize="lg"
                  m={1}
                  _hover={{
                    transition: "0.5s",
                    fontSize: "xl",
                    cursor: "pointer",
                  }}
                >
                  <Link href="/exercise">
                    <a>Add Exercise</a>
                  </Link>
                </Text>
              </GridItem>
              <GridItem
                boxShadow="1px 1px 1px 1px black"
                borderRadius="5px"
                rowSpan={1}
                colSpan={{ base: 6, md: 3, lg: 2 }}
              >
                <Text
                  textAlign="right"
                  fontSize="lg"
                  m={1}
                  _hover={{
                    transition: "0.5s",
                    fontSize: "xl",
                    cursor: "pointer",
                  }}
                >
                  <Link href="/addworkout">
                    <a>Add Workout</a>
                  </Link>
                </Text>
              </GridItem>
              <GridItem
                boxShadow="1px 1px 1px 1px black"
                borderRadius="5px"
                colSpan={{ base: 6, md: 3, lg: 2 }}
              />
              <GridItem
                boxShadow="1px 1px 1px 1px black"
                borderRadius="5px"
                colSpan={{ base: 6, md: 3, lg: 2 }}
              />
              <GridItem
                boxShadow="1px 1px 1px 1px black"
                borderRadius="5px"
                colSpan={{ base: 6, md: 3, lg: 2 }}
              />
              <GridItem
                boxShadow="1px 1px 1px 1px black"
                borderRadius="5px"
                colSpan={{ base: 6, md: 3, lg: 2 }}
              />
            </Grid>
          </>
        )}
      </main>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);
  if (session) {
    return { props: { user: session.user } };
  } else {
    return { props: { user: null } };
  }
};
