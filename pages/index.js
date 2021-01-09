import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import auth0 from "../utils/auth0";
import Layout from "../components/layout";
import {
  Text,
  Grid,
  GridItem,
  Container,
  Heading,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <Head>
        s<title>Next Workout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (
        <>
          <Grid
            as="main"
            h={{ base: "70rem", md: "xl" }}
            templateRows="auto"
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            <GridItem
              borderRadius="5px"
              rowSpan={1}
              colSpan={{ base: 3, md: 2 }}
              bg="#cfe2fa"
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
              borderRadius="5px"
              rowSpan={1}
              colSpan={{ base: 3, md: 1 }}
              bg="#cfe2fa"
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
              borderRadius="5px"
              colSpan={{ base: 3, md: 1 }}
              bg="#cfe2fa"
            />
            <GridItem
              borderRadius="5px"
              colSpan={{ base: 3, md: 1 }}
              bg="#cfe2fa"
            />
            <GridItem
              borderRadius="5px"
              colSpan={{ base: 3, md: 1 }}
              bg="#cfe2fa"
            />
            <GridItem
              borderRadius="5px"
              colSpan={{ base: 3, md: 1 }}
              bg="#cfe2fa"
            />
          </Grid>
        </>
      )}

      {!user && (
        <>
          <Box
            bgImage="url(/homebg.jpg)"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            w={"full"}
            h={"91.4vh"}
            align="center"
            justify="center"
          >
            <Box bg="rgba(0,0,0,0.5)" w="full" h="91.4vh" zIndex={2}>
              <Flex h="91.4vh" align="center">
                <Container maxW="4xl" centerContent>
                  <Heading
                    color="yellow.400"
                    fontSize={{ base: "4xl", md: "5xl", lg: "8xl" }}
                  >
                    PUMPSHOCK
                  </Heading>
                  <Heading
                    mt={4}
                    color="white"
                    fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}
                  >
                    Track your workouts with ease
                  </Heading>
                  <Text mt={4} fontSize="2xl" color="white">
                    The World's Simplest Workout Tracker
                  </Text>
                  <Link href="/api/login">
                    <a>
                      <Button colorScheme="yellow" size="lg" mt={8}>
                        Start Now
                      </Button>
                    </a>
                  </Link>
                </Container>
              </Flex>
            </Box>
          </Box>
        </>
      )}
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
