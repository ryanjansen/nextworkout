import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function WorkoutRunner({ workout, finishWorkout }) {
  const [timeTaken, setTimeTaken] = useState(0);
  const now = dayjs();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeTaken(timeTaken + 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <div>{now.format("DD MMMM YYYY HH:mm").toString()}</div>
      <div>{timeTaken}</div>
      <h1>{workout.name}</h1>
      {workout.exercises.map((exercise) => {
        return (
          <div className="exercise" key={exercise.name}>
            <h3>{exercise.name}</h3>
            {exercise.sets.map((set, index) => {
              return (
                <div className="set" key={index}>
                  <h4>Set {index + 1}</h4>
                  <h5>
                    {set.reps} reps x {set.weight} kg{" "}
                  </h5>
                  <input type="checkbox"></input>
                </div>
              );
            })}
          </div>
        );
      })}
      <button
        onClick={() => finishWorkout(now.format("YYYY-MM-DD"), timeTaken)}
      >
        Finish Workout
      </button>
    </div>
  );
}
