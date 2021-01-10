import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  Container,
  Heading,
  HStack,
  Text,
  Checkbox,
  Box,
  Input,
  Button,
  createStandaloneToast,
} from "@chakra-ui/react";

export default function WorkoutRunner({ now, workout, handleFinishWorkout }) {
  const [timeTaken, setTimeTaken] = useState(0);
  const toast = createStandaloneToast();

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeTaken(timeTaken + 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const Timer = () => {
    let minutes = Math.floor(timeTaken / 60);
    let seconds = timeTaken - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      <Heading m={5}>
        {minutes}:{seconds}
      </Heading>
    );
  };

  const onSubmit = (data) => {
    const newExercises = [];
    for (const [id, sets] of Object.entries(data)) {
      const completedSets = sets.sets.filter((set) => set.completed);
      completedSets.forEach((set) => {
        set.reps = parseInt(set.reps);
        set.weight = parseFloat(set.weight);
        delete set.completed;
      });
      if (completedSets.length !== 0) {
        const exerciseName = workout.exercises.find(
          (exercise) => exercise.exerciseData === id
        ).name;
        newExercises.push({
          exerciseData: id,
          name: exerciseName,
          sets: completedSets,
        });
      }
    }
    if (newExercises.length === 0) {
      toast({
        position: "top",
        title: "Complete Some Sets",
        description: "Don't be lazy!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Workout Completed!",
        description: "You can find it under'history'",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleFinishWorkout(timeTaken, newExercises);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container size="2xl" p={4} centerContent>
        <Heading as="u" size="2xl" textAlign="center">
          {workout.name}
        </Heading>
        <Heading mt={4} size="xl" textAlign="center">
          {now.format("DD MMMM YYYY (HH:mm)").toString()}
        </Heading>
        <Timer />
        {workout.exercises.map((exercise) => {
          return (
            <Box key={exercise.name} mb={4}>
              <Heading textAlign="center" pb={4} pt={4}>
                {exercise.name}
              </Heading>
              {exercise.sets.map((set, index) => {
                return (
                  <HStack
                    spacing={2}
                    w="100vw"
                    textAlign="center"
                    justify="center"
                    mb={4}
                  >
                    <Text
                      pr={{ base: 1, md: 4 }}
                      fontSize={{ base: "2xl", md: "4xl" }}
                    >
                      Set {index + 1}
                    </Text>
                    <Text
                      pr={{ base: 0, md: 4 }}
                      fontSize={{ base: "2xl", md: "4xl" }}
                    >
                      <Input
                        fontSize={{ base: "2xl", md: "4xl" }}
                        w={{ base: "3rem", md: "5rem" }}
                        p={1}
                        defaultValue={set.reps}
                        name={`${exercise.exerciseData}.sets[${index}].reps`}
                        ref={register}
                      />{" "}
                      reps x{" "}
                      <Input
                        fontSize={{ base: "2xl", md: "4xl" }}
                        w={{ base: "5rem", md: "7rem" }}
                        p={1}
                        defaultValue={set.weight}
                        name={`${exercise.exerciseData}.sets[${index}].weight`}
                        ref={register}
                      />{" "}
                      kg
                    </Text>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      name={`${exercise.exerciseData}.sets[${index}].completed`}
                      ref={register}
                    />
                  </HStack>
                );
              })}
            </Box>
          );
        })}

        <Button
          w="80%"
          textAlign="center"
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="3xl"
        >
          Finish Workout
        </Button>
      </Container>
    </form>
  );
}
