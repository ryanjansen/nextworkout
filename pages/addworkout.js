import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { getExercisesQuery } from "../graphql/queries";
import { useState } from "react";
import WorkoutTable from "../components/workoutTable";
import { createWorkout } from "../graphql/mutations";
import auth0 from "../utils/auth0";

export default function Workout({ exercises, user }) {
  const { register, handleSubmit, errors } = useForm();

  const [selectedExercise, setSelectedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [workout, setWorkout] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    if (!selectedExercise) {
      const exerciseData = exercises.find((exercise) => {
        return exercise.name === data.exercise;
      });
      console.log(exerciseData);
      setSelectedExercise(exerciseData);
    } else {
      const reps = parseFloat(data.reps);
      const weight = parseFloat(data.weight);
      setExerciseSets([...exerciseSets, { reps, weight }]);
    }
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
            <label>Select Exercise</label>
            <select name="exercise" ref={register()}>
              {exercises.map((exercise) => {
                return (
                  <option key={exercise.name} value={exercise.name}>
                    {exercise.name}
                  </option>
                );
              })}
            </select>
          </>
        )}

        {selectedExercise && (
          <>
            <h2>{selectedExercise.name}</h2>

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

            <label>Reps</label>
            <input name="reps" ref={register({ required: true })} />
            {errors.reps && <span>This field is required</span>}

            <label>Weight</label>
            <input name="weight" ref={register({ required: true })} />
            {errors.weight && <span>This field is required</span>}
          </>
        )}

        <input className="btn" type="submit" value="Add" />
        {selectedExercise && (
          <button onClick={handleAddToWorkout}>Add to workout</button>
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
