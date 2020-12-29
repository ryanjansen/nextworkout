import { useForm } from "react-hook-form";
import Link from "next/link";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
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
        <input type="submit" />
      </form>
    </div>
  );
}
