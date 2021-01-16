import Layout from "../components/layout";
import dayjs from "dayjs";
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
import Link from "next/link";
import Head from "next/head";

export default function Workouts({ loadedWorkouts, user }) {
  const [workouts, setWorkouts] = useState(loadedWorkouts);
  const [runningWorkout, setRunningWorkout] = useState();
  const [date, setDate] = useState();

  const toast = createStandaloneToast();

  const WorkoutCard = ({ workout }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onModalClose = onClose;
    return (
      <GridItem
        onClick={onOpen}
        key={workout._id}
        borderRadius="20px"
        colSpan={{ base: 6, md: 3, lg: 2 }}
        boxShadow="xl"
        rounded="xl"
        bg="white"
        cursor="pointer"
        transition="all 0.15s ease-out"
        _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
        pos="relative"
      >
        <Text pl={3} pt={2} fontSize="2xl" fontWeight="bold">
          {workout.name}
        </Text>

        <Text mt={2} noOfLines={5}>
          {workout.exercises.map((exercise) => {
            return (
              <Text pl={5} fontSize="lg" key={exercise.name}>
                {exercise.sets.length} x {exercise.name}
              </Text>
            );
          })}
        </Text>

        <Box
          pos="absolute"
          bottom="0"
          bg="#FFDD00"
          w="full"
          borderBottomRightRadius="10px"
          borderBottomLeftRadius="10px"
          textAlign="center"
          p={2}
        >
          <Text fontSize="lg" color="Black">
            View Workout
          </Text>
        </Box>
        <Modal
          onClose={onClose}
          size="xl"
          isOpen={isOpen}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="5xl">{workout.name}</ModalHeader>
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

              <Popover placement="top">
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
      </GridItem>
    );
  };

  const handleStartWorkout = (workout) => {
    console.log(workout);
    setRunningWorkout(workout);
    setDate(dayjs().format("YYYY-MM-DD").toString());
  };

  const handleFinishWorkout = async (timeTaken, exercises) => {
    const { mutation, variables } = createCompletedWorkout(
      runningWorkout.name,
      user.userID,
      runningWorkout._id,
      date,
      timeTaken,
      exercises
    );
    try {
      const data = await GraphQLClient.request(mutation, variables);
      console.log(data);
      setRunningWorkout();
      setDate();
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
        position: "top",
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
        <Heading size="xl" mb={4}>
          {exercise.name}
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Set</Th>
              <Th>Reps</Th>
              <Th>Kg</Th>
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
          <Heading pt={12} ml={4}>
            Workouts
          </Heading>
          <Grid
            pb={25}
            pt={12}
            h="auto"
            templateColumns={{ base: "repeat(6, 1fr)", xl: "repeat(8, 1fr)" }}
            autoRows="14rem"
            gap={4}
          >
            {workouts.map((workout) => (
              <WorkoutCard workout={workout} />
            ))}
          </Grid>

          <Link href="/addworkout">
            <a>
              <Button mt={4} colorScheme="green" size="lg" isFullWidth>
                Add Workout
              </Button>
            </a>
          </Link>
        </>
      )}

      {user && runningWorkout && (
        <WorkoutRunner
          now={dayjs()}
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
