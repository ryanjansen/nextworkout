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
  Slide,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { GrEdit } from "react-icons/gr";
import ExerciseSelector from "../components/exerciseSelector";

export default function Workout({ exercises, user }) {
  const { isOpen, onToggle } = useDisclosure();

  const [selectedExercise, setSelectedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([{ reps: 1, weight: 0 }]);
  const [workout, setWorkout] = useState([]);
  const [workoutName, setWorkoutName] = useState("New Workout");
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  const toast = createStandaloneToast();

  const generateExerciseTable = (exercise) => {
    return (
      <Box p={3} key={exercise.name}>
        <HStack>
          <Heading size="md" p={4}>
            {exercise.name}
          </Heading>
          <Button
            size="sm"
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
            size="sm"
            colorScheme="red"
            onClick={() => handleDeleteExercise(exercise.exerciseID)}
          >
            Delete
          </Button>
        </HStack>

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
    setExerciseSets([{ reps: 1, weight: 0 }]);
  };

  const handleCancelExercise = () => {
    setSelectedExercise("");
    setExerciseSets([{ reps: 1, weight: 0 }]);
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
      toast({
        title: "New Workout Saved!",
        description: "You can find it under the 'workouts' page",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setWorkoutName("New Workout");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSet = () => {
    setExerciseSets([...exerciseSets, { reps: 1, weight: 0 }]);
  };

  const handleRemoveSet = () => {
    if (exerciseSets.length !== 1) {
      setExerciseSets(
        exerciseSets.filter((_, i) => i != exerciseSets.length - 1)
      );
    }
  };

  if (showExerciseSelector) {
    return <ExerciseSelector />;
  } else
    return (
      <Layout user={user}>
        <Head>
          <title>Next Workout | Add Workout </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Slide
          overflow="auto"
          direction="right"
          in={isOpen}
          style={{ zIndex: 20 }}
          overflow="auto"
          h={"full"}
        >
          <ExerciseSelector
            toggle={onToggle}
            setSelectedExercise={setSelectedExercise}
          />
        </Slide>

        {user && (
          <>
            <Heading pt={{ base: 4, md: 12 }}>Add a Workout</Heading>
            <Grid
              pb={8}
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
                  p={4}
                >
                  <Heading size="lg">Edit Exercise</Heading>
                  <Heading size="md" pb={4} mt={4}>
                    {selectedExercise.name}
                  </Heading>
                  <Button size="sm" onClick={handleAddSet} mr={4} mb={4}>
                    Add Set
                  </Button>
                  <Button size="sm" onClick={handleRemoveSet} mb={4}>
                    Remove Set
                  </Button>

                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Set</Th>
                        <Th>Reps</Th>
                        <Th>Kg</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {exerciseSets.map((_, index) => {
                        return (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <NumberInput
                                min={1}
                                max={1000}
                                value={exerciseSets[index].reps}
                                onChange={(value) => {
                                  let newSets = exerciseSets.slice();
                                  if (
                                    !isNaN(value) &&
                                    !isNaN(parseFloat(value))
                                  ) {
                                    value = parseInt(value);
                                  }
                                  newSets[index].reps = value;
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
                                pattern="[0-9]+(.[0-9]+)"
                                min={0}
                                max={1000}
                                precision={2}
                                step={0.5}
                                value={exerciseSets[index].weight}
                                onChange={(value) => {
                                  let newSets = exerciseSets.slice();
                                  if (value.slice(-1) === ".") {
                                  } else if (
                                    !isNaN(value) &&
                                    !isNaN(parseFloat(value))
                                  ) {
                                    value = parseFloat(value);
                                    console.log(value);
                                  }
                                  newSets[index].weight = value;
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
                      <Button
                        onClick={handleAddToWorkout}
                        type="submit"
                        colorScheme="green"
                      >
                        Add to Workout
                      </Button>
                      <Button onClick={handleCancelExercise} colorScheme="red">
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </GridItem>
              )}

              {/* Workout Display */}
              <GridItem
                borderRadius="5px"
                rowSpan={1}
                colSpan={6}
                boxShadow="xl"
                rounded="xl"
                bg="white"
                p={4}
              >
                <HStack>
                  <Input
                    p={4}
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    fontSize="3xl"
                    startWithEditView
                    m={4}
                  />

                  <Icon as={GrEdit} />
                </HStack>

                {workout.map((exercise) => {
                  return generateExerciseTable(exercise);
                })}

                {!selectedExercise && (
                  <Button
                    mt={4}
                    mb={4}
                    isFullWidth
                    colorScheme="teal"
                    onClick={onToggle}
                  >
                    Add Exercise
                  </Button>
                )}

                {!selectedExercise && workout.length !== 0 && (
                  <Button
                    onClick={handleCreateWorkout}
                    colorScheme="green"
                    isFullWidth
                  >
                    Save Workout
                  </Button>
                )}
              </GridItem>
            </Grid>
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
