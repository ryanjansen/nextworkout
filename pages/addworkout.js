import { useForm, Controller } from "react-hook-form";
import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { getExercisesQuery } from "../graphql/queries";
import { useState } from "react";
import WorkoutTable from "../components/workoutTable";
import { createWorkout } from "../graphql/mutations";
import auth0 from "../utils/auth0";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Button,
  Grid,
  GridItem,
  Text,
  Icon,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  Flex,
  Box,
  createStandaloneToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { GrEdit } from "react-icons/gr";

export default function Workout({ exercises, user }) {
  const [exerciseDropdownValue, setExerciseDropdownValue] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [workoutName, setWorkoutName] = useState("New Workout");
  const [success, setSuccess] = useState(false);

  const toast = createStandaloneToast();

  const generateExerciseTable = (exercise) => {
    return (
      <Box p={3} key={exercise.name}>
        <HStack>
          <Heading p={4}>{exercise.name}</Heading>
          <Button
            onClick={() =>
              handleEditExercise(
                exercise.name,
                exercise.exerciseID,
                exercise.sets
              )
            }
          >
            Edit
          </Button>

          <Button
            colorScheme="red"
            onClick={() => handleDeleteExercise(exercise.exerciseID)}
          >
            Delete
          </Button>
        </HStack>

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

  const handleAddToWorkout = () => {
    // Transfer selected exercise and exercise sets to workout
    setWorkout([
      ...workout,
      {
        name: selectedExercise.name,
        exerciseID: selectedExercise._id,
        sets: exerciseSets,
      },
    ]);
    setSelectedExercise("");
    setExerciseSets([]);
  };

  const handleCancelExercise = () => {
    setSelectedExercise("");
    setExerciseSets([]);
  };

  const handleEditExercise = (name, _id, sets) => {
    setSelectedExercise({ name, _id });
    setExerciseSets(sets);

    setWorkout(workout.filter((e) => e.exerciseID !== _id));
  };

  const handleDeleteExercise = (id) => {
    setWorkout(workout.filter((e) => e.exerciseID !== id));
  };

  const handleCreateWorkout = async () => {
    // Save workout to database

    const { mutation, variables } = createWorkout(
      workoutName,
      user.userID,
      workout
    );

    try {
      const data = await GraphQLClient.request(mutation, variables);
      console.log(data);
      setWorkout([]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSet = () => {
    setExerciseSets([...exerciseSets, { reps: 0, weight: 0 }]);
  };

  const handleRemoveSet = () => {
    setExerciseSets(
      exerciseSets.filter((_, i) => i != exerciseSets.length - 1)
    );
  };

  return (
    <Layout user={user}>
      <Head>
        <title>Next Workout | Add Workout </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (
        <>
          <Grid
            pt={12}
            pb={8}
            as="main"
            h="auto"
            templateColumns="repeat(6, 1fr)"
            autoRows="auto"
            gap={4}
          >
            {/* Exercise Form */}
            {selectedExercise && (
              <GridItem
                borderRadius="5px"
                rowSpan={1}
                colSpan={6}
                boxShadow="xl"
                rounded="xl"
                bg="white"
              >
                <HStack>
                  <Heading p={4}>{selectedExercise.name}</Heading>
                  <Button onClick={handleAddSet}>Add Set</Button>

                  <Button onClick={handleRemoveSet}>Remove Set</Button>
                </HStack>

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Set</Th>
                      <Th>Reps</Th>
                      <Th>Weight</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {exerciseSets.map((_, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>
                            <NumberInput
                              min={0}
                              value={exerciseSets[index].reps}
                              onChange={(value) => {
                                let newSets = exerciseSets.slice();
                                newSets[index].reps = parseFloat(value);
                                setExerciseSets(newSets);
                              }}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                          <Td>
                            <NumberInput
                              min={0}
                              precision={2}
                              step={0.5}
                              value={exerciseSets[index].weight}
                              onChange={(value) => {
                                let newSets = exerciseSets.slice();
                                newSets[index].weight = parseFloat(value);
                                setExerciseSets(newSets);
                              }}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
                <Flex justify="flex-end" m={4}>
                  <ButtonGroup>
                    <Button onClick={handleAddToWorkout} colorScheme="green">
                      Add to Workout
                    </Button>
                    <Button onClick={handleCancelExercise} colorScheme="red">
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Flex>
              </GridItem>
            )}

            {/* Exercise Selector */}
            {!selectedExercise && (
              <GridItem
                p={4}
                borderRadius="5px"
                rowSpan={1}
                h={"11rem"}
                colSpan={{ base: 6, md: 2 }}
                boxShadow="lg"
                rounded="lg"
                bg="white"
              >
                <Heading fontSize={{ base: "md", lg: "lg" }} p={2}>
                  Select an Exercise
                </Heading>
                <Select
                  placeholder="Select Exercise"
                  value={exerciseDropdownValue}
                  onChange={(e) => {
                    setExerciseDropdownValue(e.target.value);
                  }}
                >
                  {exercises.map((exercise) => {
                    return (
                      <option key={exercise.name} value={exercise.name}>
                        {exercise.name}
                      </option>
                    );
                  })}
                </Select>
                <Button
                  onClick={() => {
                    if (exerciseDropdownValue) {
                      const exerciseData = exercises.find((exercise) => {
                        return exercise.name === exerciseDropdownValue;
                      });
                      setExerciseSets([{ reps: 0, weight: 0 }]);
                      setSelectedExercise(exerciseData);
                    }
                  }}
                  w={"full"}
                  colorScheme="green"
                  mt={4}
                >
                  Select
                </Button>
              </GridItem>
            )}

            {/* Workout Display */}
            <GridItem
              borderRadius="5px"
              rowSpan={1}
              colSpan={selectedExercise ? 6 : { base: 6, md: 4 }}
              boxShadow="xl"
              rounded="xl"
              bg="white"
              p={4}
            >
              <HStack>
                <Editable
                  p={4}
                  value={workoutName}
                  onChange={(value) => setWorkoutName(value)}
                  fontSize="3xl"
                  startWithEditView
                  w={"auto"}
                >
                  <EditablePreview w={"auto"} />
                  <EditableInput w={"auto"} />
                </Editable>

                <Icon as={GrEdit} />
              </HStack>

              {workout.map((exercise) => {
                return generateExerciseTable(exercise);
              })}

              {!selectedExercise && workout.length !== 0 ? (
                <Button
                  onClick={handleCreateWorkout}
                  colorScheme="green"
                  isFullWidth
                >
                  Save Workout
                </Button>
              ) : (
                <Text mt={4} textAlign="center">
                  Add some exercises!
                </Text>
              )}
            </GridItem>
          </Grid>

          {success &&
            toast({
              title: "New Workout Saved!",
              description: "You can find it under the 'workouts' page",
              status: "success",
              duration: 5000,
              isClosable: true,
            })}
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const session = await auth0.getSession(req);
    if (!session) {
      res.writeHead(302, { Location: "/" });
      res.end();
    }
    const data = await GraphQLClient.request(getExercisesQuery);
    const exercises = data.allExercises.data;
    return {
      props: { exercises, user: session.user },
    };
  } catch (error) {
    console.error(error);
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return { props: {} };
}
