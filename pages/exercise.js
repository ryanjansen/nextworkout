import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import GraphQLClient from "../utils/graphQLClient";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getExercisesQuery } from "../graphql/queries";
import { useRouter } from "next/router";
import { createExercise, deleteExercise } from "../graphql/mutations";

const fetcher = (...args) => GraphQLClient.request(...args);

const Exercise = () => {
  const router = useRouter();
  const [exercises, setExercises] = useState();
  const [user, setUser] = useState();

  const { error, data } = useSWR(getExercisesQuery, fetcher);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/me");
      console.log(res.status);
      if (res.status == 200) {
        const user = await res.json();
        setUser(user);
        console.log(user);
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
    } catch (error) {
      console.error(error);
    }
  });

  const handleDeleteExercise = async (exerciseID) => {
    const { mutation, variables } = deleteExercise(exerciseID);

    try {
      const deletedExercise = await GraphQLClient.request(mutation, variables);
      console.log(deletedExercise);
      setExercises((exercises) => {
        return exercises.filter(
          (exercise) => exercise._id !== deletedExercise.deleteExerciseData._id
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout user={user}>
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
                <div className="right-contents">
                  <div className="name">{exercise.name}</div>
                  <div className="sub-name">{exercise.category}</div>
                  <div className="sub-name">{exercise.bodypart}</div>
                </div>

                <div className="left-contents">
                  <a className="btn edit">Edit</a>
                  <a
                    className="btn delete"
                    onClick={() => handleDeleteExercise(exercise._id)}
                  >
                    Delete
                  </a>
                </div>
              </li>
            ))}
            <style jsx>
              {`
                .right-contents {
                }
                .left-contents {
                  margin-top: 30px;
                }
                ul {
                  padding-left: 0px;
                }
                .exercise {
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  margin: 5px;
                  border: 2px black;
                  border-style: none none dashed none;
                  padding-bottom: 5px;
                }

                .sub-name {
                  font-size: 20 px;
                }

                .name {
                  font-size: 25px;
                }
                .btn {
                  background-color: white;
                  border: 1px solid black;
                  color: black;
                  text-align: center;
                  text-decoration: none;
                  font-size: 16px;
                  margin-left: 1rem;
                  transition: all 0.2s;
                  border-radius: 5px;
                  padding: 10px;
                }
                .delete:hover {
                  cursor: pointer;
                  background-color: red;
                  color: white;
                }
                .edit:hover {
                  cursor: pointer;
                  background-color: green;
                  color: white;
                }
              `}
            </style>
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default Exercise;
