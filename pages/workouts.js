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
  Grid,
  GridItem,
  Text,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import Link from "next/link";
import Head from "next/head";

export default function Workouts({ workouts, user }) {
  console.log(workouts);
  console.log(user);

  const [runningWorkout, setRunningWorkout] = useState();

  const WorkoutCard = ({ workout, key }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <GridItem
          onClick={onOpen}
          key={key}
          borderRadius="5px"
          colSpan={{ base: 6, md: 3, lg: 2 }}
          boxShadow="lg"
          rounded="lg"
          bg="white"
          p={2}
          textAlign="center"
          cursor="pointer"
          transition="all 0.15s ease-out"
          _hover={{ transform: "translateY(-5px)" }}
        >
          <Text
            m={2}
            borderRadius={3}
            bg="yellow.300"
            fontSize="xl"
            fontWeight="bold"
          >
            {workout.name}
          </Text>
          <Center h={"10rem"}>
            <Text noOfLines={6}>
              {workout.exercises.map((exercise) => {
                return (
                  <Text key={exercise.name}>
                    {exercise.name} : {exercise.sets.length} sets
                  </Text>
                );
              })}
            </Text>
          </Center>
        </GridItem>

        <Modal onClose={onClose} size="xl" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{workout.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {workout.exercises.map((exercise) =>
                generateExerciseTable(exercise)
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                mr={4}
                colorScheme="green"
                onClick={() => handleStartWorkout(workout)}
              >
                Start
              </Button>
              <Button colorScheme="red" onClick={handleStartWorkout}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

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
        <Table variant="striped" colorScheme="yellow">
          <Thead>
            <Tr>
              <Th>Set</Th>
              <Th>Reps</Th>
              <Th>Weight</Th>
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
      <Head>
        <title>Next Workout | Workouts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && !runningWorkout && (
        <>
          <Grid
            pb={25}
            pt={12}
            as="main"
            h="auto"
            templateColumns={{ base: "repeat(6, 1fr)", xl: "repeat(8, 1fr)" }}
            autoRows="14rem"
            gap={4}
          >
            <GridItem
              borderRadius="5px"
              rowSpan={1}
              colSpan={{ base: 6, md: 3, lg: 4, xl: 6 }}
              boxShadow="lg"
              rounded="lg"
              bg="white"
            >
              <Text>Workouts Overview, Continue current workout</Text>
            </GridItem>
            <GridItem
              borderRadius="5px"
              rowSpan={1}
              colSpan={{ base: 6, md: 3, lg: 2 }}
              bg="white"
              align="center"
            >
              <Heading textAlign="center" mt={12}>
                Add Workout
              </Heading>
              <Link href="/addworkout">
                <a>
                  <IconButton
                    mt={4}
                    colorScheme="green"
                    aria-label="Add Workout"
                    size="lg"
                    icon={<GrAdd />}
                  />
                </a>
              </Link>
            </GridItem>
            {workouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))}
          </Grid>
        </>
      )}

      {runningWorkout && (
        <WorkoutRunner
          workout={runningWorkout}
          handleFinishWorkout={handleFinishWorkout}
        />
      )}
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
