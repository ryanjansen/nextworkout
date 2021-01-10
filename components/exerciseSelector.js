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
  Input,
  Select,
  createStandaloneToast,
  Heading,
  Skeleton,
  Spacer,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
        position: "top",
        title: "Exercise Created.",
        description: `${exercise.name} has been added to your list of exercises!`,
        status: "success",
        duration: 2000,
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
        position: "top",
        title: "Exercise Deleted",
        description: `${exerciseName} has been deleted`,
        status: "error",
        duration: 2000,
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
        h={"7rem"}
        w={"90%"}
        rowSpan={1}
        colSpan={{ base: 2, sm: 1, xl: 1 }}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => setSelectedBodyPart(bodypart)}
      >
        <Center h={"100%"}>
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
          <Text
            position="absolute"
            zIndex={20}
            color="white"
            textAlign="center"
            fontSize="xl"
            fontWeight="medium"
          >
            {bodypart}
          </Text>
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
              You have no exercises for this body part. Fill out the form to add
              exercises!
            </Text>
          </Center>
        </GridItem>
      );
    };

    const renderedExerciseList = exerciseList.map((exercise) => {
      return (
        <GridItem
          boxShadow="xl"
          rounded="lg"
          borderRadius="20px"
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
          <Flex>
            <Box pl={2} pt={2} pb={2}>
              <Text fontSize={{ base: "xl", md: "xl", lg: "2xl" }} m={1}>
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
            </Box>
            <Spacer />
            <Center
              _hover={{ bg: "yellow.500" }}
              transition="all 0.2s ease-out"
              bg="#FFDD00"
              p={2}
              borderTopRightRadius="10px"
              borderBottomRightRadius="10px"
              pos="relative"
            >
              <Text fontSize="sm">Select</Text>
              {exercise.user && (
                <Button
                  pos="absolute"
                  size="xs"
                  bottom="0"
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteExercise(exercise._id, exercise.name);
                  }}
                >
                  Delete
                </Button>
              )}
            </Center>
          </Flex>
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
        borderRadius="20px"
        rowSpan={1}
        colStart={1}
        colEnd={{ base: 8, xl: 8 }}
      >
        <Box p={8}>
          <Text fontSize="xl" mb={4} ml={2} fontWeight="medium">
            Create an Exercise
          </Text>
          <form onSubmit={onSubmit}>
            <FormControl id="name" isInvalid={errors.name} pb={4}>
              <FormLabel>Exercise Name</FormLabel>
              <Input
                name="name"
                placeholder="eg. Push Ups"
                ref={register({ required: true })}
              />
              <FormErrorMessage>Please Enter a Name</FormErrorMessage>
            </FormControl>

            <FormControl id="category" isInvalid={errors.category} pb={4}>
              <FormLabel>Exercise Category</FormLabel>
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
              <FormErrorMessage>Please Select a Category</FormErrorMessage>
            </FormControl>

            <FormControl id="bodypart" isInvalid={errors.bodypart} pb={4}>
              <FormLabel>Body Part</FormLabel>
              <Select
                name="bodypart"
                placeholder="Select Body Part"
                ref={register({ required: true })}
              >
                <option value="Legs">Legs</option>
                <option value="Back">Back</option>
                <option value="Biceps">Biceps</option>
                <option value="Chest">Chest</option>
                <option value="Triceps">Triceps</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Core">Core</option>
              </Select>
              <FormErrorMessage>Please Select a Body Part</FormErrorMessage>
            </FormControl>

            <Button isFullWidth p={4} colorScheme="green" type="submit">
              Add Exercise
            </Button>
          </form>
        </Box>
      </GridItem>
    );
  };

  if (!user) {
    return (
      <Layout user="test">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </Layout>
    );
  }

  return (
    <Box
      zIndex={20}
      bg="white"
      p={4}
      mb={{ base: 12, md: 0 }}
      ml={{ base: 0, md: 64 }}
      as="main"
      overflow="auto"
      h="full"
    >
      <Heading pt={12} ml={4}>
        Select an Exercise
      </Heading>

      <Grid
        padding={4}
        pb={{ base: 24, md: 0 }}
        h="auto"
        autoRows="auto"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        {exercises ? renderExercises(exercises) : <Heading>Loading...</Heading>}

        <AddExerciseForm />
      </Grid>
      <Grid
        p={2}
        h="auto"
        templateRows={{
          base: "repeat(4, 1fr)",
          sm: "repeat(2, 1fr)",
          xl: "repeat(1, 1fr)",
        }}
        templateColumns={{ base: "repeat(4, 1fr)", xl: "repeat(8, 1fr)" }}
        gap={4}
      >
        {renderBodyPart("All", "/images/all.jpg")}
        {renderBodyPart("Legs", "/images/legs.jpg")}
        {renderBodyPart("Chest", "/images/chest.jpg")}
        {renderBodyPart("Triceps", "/images/triceps.jpg")}
        {renderBodyPart("Back", "/images/back.jpg")}
        {renderBodyPart("Biceps", "/images/biceps.jpg")}
        {renderBodyPart("Shoulders", "/images/shoulders.jpg")}
        {renderBodyPart("Core", "/images/abs.jpg")}
      </Grid>
    </Box>
  );
};

export default ExerciseSelector;
