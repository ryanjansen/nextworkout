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
  Grid,
  GridItem,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  createStandaloneToast,
} from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import Link from "next/link";
import Head from "next/head";

export default function Workouts({ loadedWorkouts, user }) {
  const [workouts, setWorkouts] = useState(loadedWorkouts);
  const [runningWorkout, setRunningWorkout] = useState();

  const toast = createStandaloneToast();

  const WorkoutCard = ({ workout }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onModalClose = onClose;
    return (
      <>
        <GridItem
          onClick={onOpen}
          key={workout._id}
          borderRadius="5px"
          colSpan={{ base: 6, md: 3, lg: 2 }}
          boxShadow="lg"
          rounded="lg"
          bg="white"
          p={6}
          cursor="pointer"
          transition="all 0.15s ease-out"
          _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
        >
          <Text as="u" fontSize="2xl" fontWeight="bold">
            {workout.name}
          </Text>

          <Text mt={2} noOfLines={6}>
            {workout.exercises.map((exercise) => {
              return (
                <Text fontSize="md" key={exercise.name}>
                  {exercise.sets.length} x {exercise.name}
                </Text>
              );
            })}
          </Text>
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

              <Popover placement="right">
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Button colorScheme="red">Delete</Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Confirmation</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Box>Are you sure you want to delete this workout?</Box>
                        <Button
                          mt={4}
                          colorScheme="red"
                          onClick={() => {
                            onClose();
                            onModalClose();
                            handleDeleteWorkout(workout._id);
                          }}
                        >
                          Confirm
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </>
                )}
              </Popover>
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
      setWorkouts(workouts.filter((w) => w._id !== workoutID));
      toast({
        title: "Workout Deleted",
        description: "Your workout had been deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
              <WorkoutCard workout={workout} />
            ))}
          </Grid>
        </>
      )}

      {user && runningWorkout && (
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
    const loadedWorkouts = res.findUserByID.workouts.data;
    return {
      props: { loadedWorkouts, user: session.user },
    };
  } catch (error) {
    console.error(error);
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return { props: {} };
}
