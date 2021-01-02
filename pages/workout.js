import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { gql } from "graphql-request";
import { useState } from "react";
import WorkoutTable from "../components/workoutTable";

export default function Workout({ data }) {
  const { register, handleSubmit, errors } = useForm();
  const [exercises, setExercises] = useState([
    { name: "Bench Press", weight: "65kg", reps: 5, sets: 3 },
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  console.log(data);

  const onSubmit = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  const handleAddWorkout = () => {
    setExercises([]);
    setSuccessMessage("Workout Added!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Exercise</label>
        <select name="name" ref={register()}>
          {data.exercises.data.map((exercise) => {
            console.log(exercise);
            return (
              <option key={exercise.name} value={exercise.name}>
                {exercise.name}
              </option>
            );
          })}
        </select>

        <label>Sets</label>
        <input name="sets" ref={register({ required: true })} />
        {errors.sets && <span>This field is required</span>}

        <label>Reps</label>
        <input name="reps" ref={register({ required: true })} />
        {errors.reps && <span>This field is required</span>}

        <label>Weight</label>
        <input name="weight" ref={register({ required: true })} />
        {errors.weight && <span>This field is required</span>}

        <input className="btn" type="submit" />

        <style jsx>{`
          input {
            display: block;
            width: 100%;
            margin: 5px 0;
            font-size: 20px;
            padding: 10px 5px;
            border-radius: 5px;
            border: 1px solid black;
          }

          label {
            display: block;
            margin-top: 2rem;
            font-size: 25px;
          }

          .btn {
            background-color: white;
            border: 1px solid black;
            color: black;
            padding: 10px 32px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            margin-top: 1rem;
            transition: all 0.2s;
          }

          .btn:hover {
            cursor: pointer;
            background-color: black;
            color: white;
          }

          select {
            border-radius: 5px;
            padding: 5px;
            margin-top: 20px;
            width: 100%;
            font-size: 20px;
            border: 1px solid black;
            height: 34px;
            -webkit-apperance: none;
            -moz-appearance: none;
          }
        `}</style>
      </form>

      <WorkoutTable exercises={exercises} handleAddWorkout={handleAddWorkout} />
      {successMessage}
    </Layout>
  );
}

export async function getServerSideProps() {
  const query = gql`
    query GetExercises {
      exercises {
        data {
          _id
          name
          category
          bodypart
        }
      }
    }
  `;

  try {
    const data = await GraphQLClient.request(query);
    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
    const data = null;
    return {
      props: { data },
    };
  }
}
