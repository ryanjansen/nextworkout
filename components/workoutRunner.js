import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

export default function WorkoutRunner({ workout, handleFinishWorkout }) {
  const [timeTaken, setTimeTaken] = useState(0);
  const now = dayjs();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeTaken(timeTaken + 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const Timer = () => {
    let minutes = Math.floor(timeTaken / 60);
    let seconds = timeTaken - minutes;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      <Heading m={5}>
        {minutes}:{seconds}
      </Heading>
    );
  };

  return (
    <Container size="2xl" p={8} centerContent>
      <Heading as="u" size="2xl">
        {workout.name}
      </Heading>
      <Heading mt={4} size="xl">
        {now.format("DD MMMM YYYY (HH:mm)").toString()}
      </Heading>
      <Timer />
      {workout.exercises.map((exercise) => {
        return (
          <Box key={exercise.name}>
            <Heading textAlign="center" pb={4} pt={4}>
              {exercise.name}
            </Heading>
            {exercise.sets.map((set, index) => {
              return (
                <HStack
                  spacing={5}
                  w="100vw"
                  bg={index % 2 === 0 ? "yellow.300" : "white"}
                  textAlign="center"
                  justify="center"
                >
                  <Text
                    pr={{ base: 2, md: 4 }}
                    fontSize={{ base: "3xl", md: "4xl" }}
                  >
                    Set {index + 1}
                  </Text>
                  <Text
                    pr={{ base: 2, md: 4 }}
                    fontSize={{ base: "3xl", md: "4xl" }}
                  >
                    <Input
                      fontSize={{ base: "3xl", md: "4xl" }}
                      w="5rem"
                      defaultValue={set.reps}
                    />{" "}
                    reps x{" "}
                    <Input
                      fontSize={{ base: "3xl", md: "4xl" }}
                      w="7rem"
                      defaultValue={set.weight}
                    />{" "}
                    kg
                  </Text>
                  <Checkbox size="lg" colorScheme="green" />
                </HStack>
              );
            })}
          </Box>
        );
      })}
      <Button
        colorScheme="green"
        size="lg"
        fontSize="3xl"
        p={12}
        mt={4}
        onClick={() => handleFinishWorkout(now.format("YYYY-MM-DD"), timeTaken)}
      >
        Finish Workout
      </Button>
    </Container>
  );
}
