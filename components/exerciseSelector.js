import { useForm } from "react-hook-form";
import Head from "next/head";
import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getExercisesQuery } from "../graphql/queries";
import { useRouter } from "next/router";
import { createExercise, deleteExercise } from "../graphql/mutations";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Image,
  Center,
  VStack,
  Button,
  HStack,
  Input,
  Select,
  createStandaloneToast,
  Heading,
  Skeleton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";

const fetcher = (...args) => GraphQLClient.request(...args);

const ExerciseSelector = ({ toggle, setSelectedExercise }) => {
  const router = useRouter();
  const [exercises, setExercises] = useState();
  const [user, setUser] = useState();
  const [selectedBodyPart, setSelectedBodyPart] = useState("All");

  const { data } = useSWR(getExercisesQuery, fetcher);
  const toast = createStandaloneToast();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/me");
      if (res.status == 200) {
        const user = await res.json();
        setUser(user);
      } else {
        router.push("/");
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (data) {
      setExercises(data.allExercises.data);
    }
  }, [data]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(async (exercise) => {
    const { mutation, variables } = createExercise(
      user.userID,
      exercise.name,
      exercise.category,
      exercise.bodypart
    );

    try {
      const newExercise = await GraphQLClient.request(mutation, variables);
      setExercises((exercises) => [
        ...exercises,
        newExercise.createExerciseData,
      ]);
      toast({
        title: "Exercise Created.",
        description: `${exercise.name} has been added to your list of exercises!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleDeleteExercise = async (exerciseID, exerciseName) => {
    const { mutation, variables } = deleteExercise(exerciseID);

    try {
      const deletedExercise = await GraphQLClient.request(mutation, variables);
      console.log(deletedExercise);
      setExercises((exercises) => {
        return exercises.filter(
          (exercise) => exercise._id !== deletedExercise.deleteExerciseData._id
        );
      });
      toast({
        title: "Exercise Deleted",
        description: `${exerciseName} has been deleted`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderBodyPart = (bodypart, image) => {
    return (
      <GridItem
        position="relative"
        borderRadius="10px"
        boxShadow="dark-lg"
        rounded="2xl"
        maxW={"10.5rem"}
        h={"80%"}
        w={"80%"}
        rowSpan={1}
        colSpan={1}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => setSelectedBodyPart(bodypart)}
      >
        <Center h={"100%"}>
          <Text
            position="absolute"
            zIndex={20}
            color="white"
            textAlign="center"
            fontSize="2xl"
            fontWeight="medium"
          >
            {bodypart}
          </Text>
          <Box
            borderRadius="10px"
            position="absolute"
            width="100%"
            height="100%"
            bg="grey"
            opacity={selectedBodyPart === bodypart ? 0 : 0.6}
            zIndex={10}
            _hover={{
              opacity: "0",
            }}
          />

          <Image
            borderRadius="10px"
            position="absolute"
            src={image}
            alt="abs"
            height="100%"
            width="100%"
            fit="cover"
          />
        </Center>
      </GridItem>
    );
  };

  const renderExercises = (exercises) => {
    var exerciseList;
    if (selectedBodyPart != "All") {
      exerciseList = _.filter(exercises, {
        bodypart: selectedBodyPart,
      });
    } else {
      exerciseList = exercises;
    }

    const noExercises = () => {
      return (
        <GridItem
          boxShadow="lg"
          rounded="lg"
          borderRadius="5px"
          h={"14rem"}
          colSpan={{ base: 6, md: 3, lg: 2 }}
          p={4}
        >
          <Center h={"100%"}>
            <Text
              textAlign="center"
              fontSize={{ base: "md", md: "md", lg: "lg" }}
              m={1}
            >
              You have no exercises for this body part. Fill out the form above
              to add exercises!
            </Text>
          </Center>
        </GridItem>
      );
    };

    const renderedExerciseList = exerciseList.map((exercise) => {
      return (
        <GridItem
          boxShadow="lg"
          rounded="lg"
          borderRadius="5px"
          h={"14rem"}
          cursor="pointer"
          transition="all 0.1s ease-out"
          rowSpan={1}
          colSpan={{ base: 6, md: 2 }}
          _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
          onClick={() => {
            setSelectedExercise(exercise);
            toggle();
          }}
        >
          <Center h={"100%"}>
            <VStack>
              <Text
                textAlign="center"
                fontSize={{ base: "lg", md: "lg", lg: "xl" }}
                m={1}
              >
                {exercise.name}
              </Text>
              <Text
                color="grey"
                fontSize={{ base: "md", md: "md", lg: "lg" }}
                m={1}
              >
                {exercise.category}
              </Text>
              <Text
                color="grey"
                fontSize={{ base: "md", md: "md", lg: "lg" }}
                m={1}
              >
                {exercise.bodypart}
              </Text>
              {exercise.user && (
                <HStack>
                  <Button colorScheme="teal">Edit</Button>
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      handleDeleteExercise(exercise._id, exercise.name)
                    }
                  >
                    Delete
                  </Button>
                </HStack>
              )}
            </VStack>
          </Center>
        </GridItem>
      );
    });
    return renderedExerciseList.length != 0
      ? renderedExerciseList
      : noExercises();
  };

  const AddExerciseForm = () => {
    return (
      <GridItem
        boxShadow="xl"
        rounded="xl"
        borderRadius="5px"
        rowSpan={1}
        colStart={1}
        colEnd={{ base: 8, xl: 8 }}
      >
        <Box p={4} width="100%">
          <Text fontSize="xl" mb={4} ml={2} fontWeight="medium">
            Create an Exercise
          </Text>
          <form onSubmit={onSubmit}>
            <VStack spacing={5}>
              <Text
                color="black"
                fontSize={{ base: "md", md: "md", lg: "lg" }}
                m={1}
              >
                Exercise Name
              </Text>
              <Input
                name="name"
                placeholder="eg. Push Ups"
                ref={register({ required: true })}
              />
              <Text
                color="black"
                fontSize={{ base: "md", md: "md", lg: "lg" }}
                m={1}
              >
                Category
              </Text>
              <Select
                name="category"
                placeholder="Select Category"
                ref={register({ required: true })}
              >
                <option value="Barbell">Barbell</option>
                <option value="Dumbell">Dumbbell</option>
                <option value="Bodyweight">Bodyweight</option>
                <option value="Machine">Machine</option>
                <option value="Cable">Cable</option>
              </Select>
              <Text
                color="black"
                fontSize={{ base: "md", md: "md", lg: "lg" }}
                m={1}
              >
                Body Part
              </Text>
              <Select
                name="bodypart"
                placeholder="Select Body Part"
                ref={register({ required: true })}
              >
                <option value="Core">Core</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Biceps">Biceps</option>
                <option value="Triceps">Triceps</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Legs">Legs</option>
              </Select>
              <Button p={4} colorScheme="teal" type="submit">
                Add Exercise
              </Button>
            </VStack>
          </form>
        </Box>
      </GridItem>
    );
  };

  if (!user) {
    return (
      <Layout user="test">
        <Skeleton height="33vh" />
        <Skeleton height="33vh" />
        <Skeleton height="33vh" />
      </Layout>
    );
  }

  return (
    <Box
      bg="white"
      p={4}
      mb={{ base: 12, md: 0 }}
      ml={{ base: 0, md: 64 }}
      as="main"
      overflow="auto"
      h={"full"}
    >
      <Heading pt={12} ml={4}>
        Select an Exercise
      </Heading>
      <Grid
        padding={4}
        h="auto"
        autoRows="auto"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={6}>
          <Text fontSize="xl" mb={4} ml={2} fontWeight="medium">
            Filter by Bodypart
          </Text>
          <Grid
            padding={4}
            h={{ base: "27rem", xl: " 16rem" }}
            templateRows={{ base: "repeat(2, 1fr)", xl: "repeat(1, 1fr)" }}
            templateColumns={{ base: "repeat(4, 1fr)", xl: "repeat(8, 1fr)" }}
            gap={2}
          >
            {renderBodyPart("Core", "/images/abs.jpg")}
            {renderBodyPart("Chest", "/images/chest.jpg")}
            {renderBodyPart("Back", "/images/back.jpg")}
            {renderBodyPart("Biceps", "/images/biceps.jpg")}
            {renderBodyPart("Triceps", "/images/triceps.jpg")}
            {renderBodyPart("Shoulders", "/images/shoulders.jpg")}
            {renderBodyPart("Legs", "/images/legs.jpg")}
            {renderBodyPart("All", "/images/all.jpg")}
          </Grid>
        </GridItem>

        {exercises ? renderExercises(exercises) : <Heading>Loading...</Heading>}

        {/* Form */}

        <AddExerciseForm />
      </Grid>
    </Box>
  );
};

export default ExerciseSelector;
