import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function WorkoutRunner({ workout, finishWorkout }) {
  const [timeTaken, setTimeTaken] = useState(0);
  const now = dayjs().format("DD MMMM YYYY HH:mm").toString();

  useEffect(() => {
    setInterval(() => {
      setTimeTaken(timeTaken + 1);
    }, 1000);
  }, []);

  return (
    <div>
      {now}
      {timeTaken}
      <h1>{workout.name}</h1>
      {workout.exercises.map((exercise) => {
        return (
          <div className="exercise" key={exercise.name}>
            <h3>{exercise.name}</h3>
            {exercise.sets.map((set, index) => {
              return (
                <>
                  <div className="set" key={index}>
                    <h4>Set {index}</h4>
                    <h5>
                      {set.reps} reps x {set.weight} kg{" "}
                    </h5>
                  </div>
                  <input type="checkbox"></input>
                </>
              );
            })}
          </div>
        );
      })}
      <button onClick={finishWorkout}>Finish Workout</button>
    </div>
  );
}
