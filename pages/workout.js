import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { getWorkoutsByUser } from "../graphql/queries";
import { useState } from "react";
import auth0 from "../utils/auth0";
import WorkoutRunner from "../components/workoutRunner";
import { createCompletedWorkout, deleteWorkout } from "../graphql/mutations";
import {
  Container,
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Stack,
} from "@chakra-ui/react";

export default function Workout({ workouts, user }) {
  console.log(workouts);
  console.log(user);

  const [runningWorkout, setRunningWorkout] = useState();

  const handleStartWorkout = (workout) => {
    console.log(workout);
    setRunningWorkout(workout);
  };

  const handleFinishWorkout = async (date, timeTaken) => {
    const { mutation, variables } = createCompletedWorkout(
      runningWorkout.name,
      user.userID,
      runningWorkout._id,
      date,
      timeTaken,
      runningWorkout.exercises
    );
    try {
      const data = await GraphQLClient.request(mutation, variables);
      console.log(data);
      setRunningWorkout();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWorkout = async (workoutID) => {
    const { mutation, variables } = deleteWorkout(workoutID);
    try {
      const data = await GraphQLClient.request(mutation, variables);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateExerciseTable = (exercise) => {
    return (
      <Box p={3} key={exercise.name}>
        <Heading size="m" mb={4}>
          {exercise.name}
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Set</Th>
              <Th isNumeric>Reps</Th>
              <Th isNumeric>Weight</Th>
            </Tr>
          </Thead>
          <Tbody>
            {exercise.sets.map((set, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{set.reps}</Td>
                  <Td>{set.weight}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <Layout user={user}>
      <Container maxW="xl" centerContent>
        <Heading size="3xl" mb={4} mt={4}>
          Workouts
        </Heading>
        {runningWorkout ? (
          <WorkoutRunner
            workout={runningWorkout}
            finishWorkout={handleFinishWorkout}
          />
        ) : (
          <>
            {workouts.map((workout) => {
              return (
                <Box
                  border="1px"
                  borderColor="grey.200"
                  p={6}
                  m={10}
                  key={workout._id}
                >
                  <Heading size="xl" mb={4}>
                    {workout.name}
                  </Heading>
                  {workout.exercises.map((exercise) => {
                    return generateExerciseTable(exercise);
                  })}

                  <Stack direction="row" spacing={4}>
                    <Button
                      colorScheme="green"
                      onClick={() => handleStartWorkout(workout)}
                    >
                      Start Workout
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteWorkout(workout._id)}
                    >
                      Delete Workout
                    </Button>
                  </Stack>
                </Box>
              );
            })}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const session = await auth0.getSession(req);
    const { query, variables } = getWorkoutsByUser(session.user.userID);
    const res = await GraphQLClient.request(query, variables);
    const workouts = res.findUserByID.workouts.data;
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
