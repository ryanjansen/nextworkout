import { useForm } from "react-hook-form";

function WorkoutForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="exercise">Exercise</label>
      <input name="exercise" ref={register({ required: true })} />
      {errors.exercise && <span>This field is required</span>}

      <label for="sets">Sets</label>
      <input name="sets" ref={register({ required: true })} />
      {errors.sets && <span>This field is required</span>}

      <label for="reps">Reps</label>
      <input name="reps" ref={register({ required: true })} />
      {errors.reps && <span>This field is required</span>}

      <label for="weight">Weight</label>
      <input name="weight" ref={register({ required: true })} />
      {errors.weight && <span>This field is required</span>}

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
          font-size: 30px;
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

export default function Workout() {
  return (
    <div className="container">
      <WorkoutForm />

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
