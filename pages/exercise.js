import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { gql } from "graphql-request";
import { useState, useEffect } from "react";
import GetExercises from "../utils/getExercises";

export default function Exercise() {
  const [exercises, setExercises] = useState(null);

  const { data, error } = GetExercises();

  useEffect(() => {
    if (data) {
      setExercises(data.exercises.data);
    }
  }, [data]);

  if (error)
    return (
      <Layout>
        <div>Failed to Load</div>
      </Layout>
    );

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = handleSubmit(async (exercise) => {
    const query = gql`
      mutation addExercise(
        $name: String!
        $category: String!
        $bodypart: String!
      ) {
        createExercise(
          data: { name: $name, category: $category, bodypart: $bodypart }
        ) {
          name
          category
          bodypart
        }
      }
    `;

    try {
      const newExercise = await GraphQLClient.request(query, exercise);
      setExercises((exercises) => [...exercises, newExercise.createExercise]);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Layout>
      <h1>Add Exercise</h1>
      <form onSubmit={onSubmit}>
        <label>Exercise Name</label>
        <input
          name="name"
          placeholder="eg. Push Ups"
          ref={register({ required: true })}
        />
        {errors.name && <span>Please enter the name</span>}
        <label>Category</label>
        <input
          name="category"
          placeholder="eg. Barbell"
          ref={register({ required: true })}
        />
        {errors.category && <span>Please enter the category</span>}
        <label>Body Part</label>
        <input
          name="bodypart"
          placeholder="eg. Chest"
          ref={register({ required: true })}
        />
        {errors.bodypart && <span>Please enter the body part</span>}
        <input className="btn" type="submit" />

        <style jsx>{`
          input {
            display: block;
            margin: 5px 0;
            font-size: 20px;
            padding: 10px 5px;
            border-radius: 5px;
            border: 1px solid black;
          }
          label {
            display: block;
            margin-top: 3rem;
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
        `}</style>
      </form>

      <div className="exercises">
        <h1>Exercises</h1>
        {exercises ? (
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise._id} className="exercise">
                <span>{exercise.name}</span>
                <a>Delete</a>
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Layout>
  );
}
