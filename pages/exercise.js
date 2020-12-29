import { useForm } from "react-hook-form";
import Link from "next/link";

function ExerciseForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Exercise Name:</label>
      <input
        name="exerciseName"
        placeholder="eg. Push Ups"
        ref={register({ required: true })}
      />
      {errors.exerciseName && (
        <span>Please enter the name for this exercise</span>
      )}
      <label>Equipment:</label>
      <input
        name="equipment"
        placeholder="eg. Barbell"
        ref={register({ required: true })}
      />
      {errors.equipment && (
        <span>Please enter the equipement needed for this exercise</span>
      )}
      <label>Link to video:</label>
      <input name="videoReference" ref={register} />
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
  );
}

export default function Exercise() {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <div className="container">
        <ExerciseForm />

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </>
  );
}
