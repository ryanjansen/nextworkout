import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import auth0 from "../utils/auth0";
import Layout from "../components/layout";
import {
  getCompletedWorkoutsByUser,
  getWorkoutsByUser,
} from "../graphql/queries";
import GraphQLClient from "../utils/graphQLClient";
import _ from "lodash";
import { useRouter } from "next/router";
import {
  Text,
  Grid,
  GridItem,
  Container,
  Heading,
  Button,
  Box,
  Flex,
  VStack,
  Center,
  HStack,
} from "@chakra-ui/react";

export default function Home({ user, completedWorkouts, loadedWorkouts }) {
  const router = useRouter();

  const renderAllWorkouts = (workouts) => {
    return workouts.map((workout) => {
      return (
        <Box m={1} bg="#e3e3e3" borderRadius="5px">
          <Flex direction="row" justifyContent="space-evenly">
            <Text fontWeight={600}>{workout.name}</Text>
          </Flex>
        </Box>
      );
    });
  };

  const renderRecentWorkouts = (workouts) => {
    return _.chain(workouts)
      .reverse()
      .slice(0, 3)
      .value()
      .map((workout) => {
        return (
          <Box m={1} bg="#e3e3e3" borderRadius="5px">
            <VStack spacing="0px">
              <Text fontWeight={600}>{workout.name}</Text>
              <Text>{workout.date}</Text>
            </VStack>
          </Box>
        );
      });
  };

  const renderFavoriteExercises = (workouts) => {
    var allExercises = [];

    const exercisesByWorkout = workouts.map((workout) => {
      return workout.exercises;
    });

    exercisesByWorkout.forEach((element) => {
      element.forEach((insideElement) => {
        allExercises.push(insideElement.name);
      });
    });

    var arr = _.chain(allExercises)
      .countBy()
      .toPairs()
      .sortBy(1)
      .reverse()
      .map(0)
      .slice(0, 3)
      .value();

    return arr.map((exercise) => {
      return (
        <Box m={1} bg="#e3e3e3" borderRadius="5px">
          <Center w="100%">
            <Text fontWeight={600}>{exercise}</Text>
          </Center>
        </Box>
      );
    });
  };

  return (
    <Layout user={user}>
      <Head>
        <title>Pumpshock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (
        <Grid
          padding={4}
          pb={12}
          h={{ base: "auto", md: "auto" }}
          autoRows="auto"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem
            p={4}
            minH="20rem"
            boxShadow="xl"
            rounded="xl"
            borderRadius="2-px"
            rowSpan={1}
            colSpan={{ base: 6, md: 3, xl: 3 }}
            onClick={() => router.push("/history")}
            cursor="pointer"
            transition="all 0.15s ease-out"
            _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
          >
            <Heading m={1} size="lg">
              Recent Workouts
            </Heading>
            <Text m={1} color="grey">
              Your most recenlty completed workouts
            </Text>
            <Flex direction="column" justifyContent="space-evenly">
              {renderRecentWorkouts(completedWorkouts)}
            </Flex>
          </GridItem>
          <GridItem
            p={4}
            minH="20rem"
            boxShadow="xl"
            rounded="xl"
            borderRadius="5px"
            rowSpan={1}
            colSpan={{ base: 6, md: 3, xl: 3 }}
          >
            <Heading m={1} size="lg">
              Favorite Exercises
            </Heading>
            <Text m={1} color="grey">
              Exercises for which you have completed the most number of sets
            </Text>
            <Flex direction="column" justifyContent="space-evenly">
              {renderFavoriteExercises(completedWorkouts)}
            </Flex>
          </GridItem>
          <GridItem
            p={4}
            minH="20rem"
            boxShadow="xl"
            rounded="xl"
            borderRadius="5px"
            rowSpan={1}
            colSpan={{ base: 6, md: 6, xl: 6 }}
            onClick={() => router.push("/workouts")}
            cursor="pointer"
            transition="all 0.15s ease-out"
            _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
          >
            <Heading m={1} size="lg">
              All Workouts
            </Heading>
            <Text m={1} color="grey">
              All workouts that you have created
            </Text>
            <Flex direction="column" justifyContent="space-evenly">
              {renderAllWorkouts(loadedWorkouts)}
            </Flex>
          </GridItem>
        </Grid>
      )}
      {!user && (
        <>
          <Box
            bgImage="url(/homebg.jpg)"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            w="full"
            h="100vh"
            align="center"
            justify="center"
          >
            <Box bg="rgba(0,0,0,0.8)" w="full" h="100vh" zIndex={2}>
              <Flex h="100vh" align="center">
                <Container maxW="6xl" centerContent>
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

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    try {
      const { query, variables } = getCompletedWorkoutsByUser(
        session.user.userID
      );
      const res = await GraphQLClient.request(query, variables);
      const completedWorkouts = res.findUserByID.completedWorkouts.data;
      const { query: queryTwo, variables: variablesTwo } = getWorkoutsByUser(
        session.user.userID
      );
      const resTwo = await GraphQLClient.request(queryTwo, variablesTwo);
      const loadedWorkouts = resTwo.findUserByID.workouts.data;
      return {
        props: { loadedWorkouts, completedWorkouts, user: session.user },
      };
    } catch (error) {
      console.error(error);
      res.writeHead(302, { Location: "/" });
      res.end();
      return { props: {} };
    }
  }

  return { props: {} };
}
