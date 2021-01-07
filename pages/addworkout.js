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
} from "@chakra-ui/react";

export default function Workout({ exercises, user }) {
  const { register, handleSubmit, errors, control } = useForm();

  const [selectedExercise, setSelectedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [workout, setWorkout] = useState([]);

  const NI = ({ ...rest }) => {
    return (
      <NumberInput {...rest}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    // if (!selectedExercise) {
    //   const exerciseData = exercises.find((exercise) => {
    //     return exercise.name === data.exercise;
    //   });
    //   console.log(exerciseData);
    //   setSelectedExercise(exerciseData);
    // } else {
    //   const reps = parseFloat(data.reps);
    //   const weight = parseFloat(data.weight);
    //   setExerciseSets([...exerciseSets, { reps, weight }]);
    // }
  };

  const handleAddToWorkout = () => {
    // Transfer selected exercise and exercise sets to workout
    console.log("clicked");
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

  const handleCreateWorkout = async () => {
    // Save workout to database

    const { mutation, variables } = createWorkout(
      "Testing Workout",
      user.userID,
      workout
    );

    try {
      const data = await GraphQLClient.request(mutation, variables);
      console.log(data);
      setWorkout([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout user={user}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!selectedExercise && (
          <>
            <FormLabel>Select Exercise</FormLabel>
            <Select
              placeholder="Select Exercise"
              name="exercise"
              ref={register()}
            >
              {exercises.map((exercise) => {
                return (
                  <option key={exercise.name} value={exercise.name}>
                    {exercise.name}
                  </option>
                );
              })}
            </Select>
          </>
        )}

        <Heading>{selectedExercise.name}</Heading>

        {exerciseSets.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>Set</th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {exerciseSets.map((exercise, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exercise.reps}</td>
                    <td>{exercise.weight}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <FormControl isInvalid={errors.reps}>
          <FormLabel htmlFor="reps" mt={4}>
            Reps
          </FormLabel>
          <NumberInput min={0} defaultValue={1}>
            <NumberInputField name="reps" ref={register({ required: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>Do some reps!</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.weight}>
          <FormLabel htmlFor="weight" mt={4}>
            Weight
          </FormLabel>

          <NumberInput defaultValue={0} min={0} precision={2} step={2.5}>
            <NumberInputField
              name="weight"
              ref={register({ required: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>Add some weight!</FormErrorMessage>
        </FormControl>

        <Button mt={4} type="submit">
          Add
        </Button>

        {selectedExercise && (
          <Button mt={4} ml={4} colorScheme="red" onClick={handleAddToWorkout}>
            Add to workout
          </Button>
        )}
      </form>

      <WorkoutTable
        workout={workout}
        handleCreateWorkout={handleCreateWorkout}
      />
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
