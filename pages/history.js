import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import dayjs from "dayjs";
import { getCompletedWorkoutsByUser } from "../graphql/queries";
import Head from "next/head";
import auth0 from "../utils/auth0";
import {
  Grid,
  GridItem,
  Button,
  Text,
  Heading,
  Flex,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";

export default function WorkoutHistory({ workouts, user }) {
  console.log(workouts);
  console.log(user);

  workouts = workouts.reverse();

  const Timer = ({ timeTaken }) => {
    let minutes = Math.floor(timeTaken / 60);
    let seconds = timeTaken - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      <Text>
        {minutes}:{seconds}
      </Text>
    );
  };

  const HistoryCard = ({ key, workout }) => {
    return (
      <GridItem
        key={key}
        borderRadius="5px"
        rowSpan={2}
        colSpan={{ base: 6, md: 3, lg: 2 }}
        boxShadow="xl"
        rounded="lg"
        bg="white"
        p={8}
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#FFDD00",
            borderRadius: "24px",
          },
        }}
      >
        <Heading pb={1} borderBottom={"1px solid black"}>
          {workout.name}
        </Heading>
        <Flex mt={2} mb={4} align="center">
          <Text>{dayjs(workout.date).format("DD MMMM YYYY").toString()}</Text>
          <Spacer />
          <Icon as={BiTimeFive} mr={2} />

          <Timer timeTaken={workout.timeTaken} />
        </Flex>

        {workout.exercises.map((exercise) => {
          return (
            <>
              <Flex mb={1} mt={3} align="center" key={exercise._id}>
                <Text fontWeight="medium">{exercise.name}</Text>
                <Spacer />
                <Text fontWeight="medium">1 RM</Text>
              </Flex>

              {exercise.sets.map((set, index) => {
                return (
                  <Flex align="center" key={index}>
                    <Text mr={4}>{index + 1}</Text>
                    <Text>
                      {set.weight} kg x {set.reps}
                    </Text>
                    <Spacer />
                    <Text>{Math.floor(set.weight * 1.1307 + 0.6998)}</Text>
                  </Flex>
                );
              })}
            </>
          );
        })}
      </GridItem>
    );
  };

  return (
    <Layout user={user}>
      <Head>
        <title>Next Workout | History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading mt={12}>History</Heading>

      {user && (
        <>
          <Grid
            pb={25}
            pt={12}
            h="auto"
            templateColumns="repeat(6, 1fr)"
            autoRows="14rem"
            gap={4}
          >
            {workouts.map((workout) => (
              <HistoryCard key={workout._id} workout={workout} />
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const session = await auth0.getSession(req);
    const { query, variables } = getCompletedWorkoutsByUser(
      session.user.userID
    );
    const res = await GraphQLClient.request(query, variables);
    const workouts = res.findUserByID.completedWorkouts.data;
    return {
      props: { workouts, user: session.user },
    };
  } catch (error) {
    console.error(error);
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return { props: {} };
}
