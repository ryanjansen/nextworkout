const workoutTable = ({ workout, handleCreateWorkout }) => {
  if (workout.length !== 0) {
    return (
      <div className="container">
        <h1>New Workout</h1>
        {workout.map((exercise) => {
          return (
            <div className="exercise" key={exercise.exerciseID}>
              <h2>{exercise.name}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Weight</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((exercise, index) => {
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
            </div>
          );
        })}

        <button onClick={handleCreateWorkout}>Save Workout</button>
        <style jsx>{`
          .container {
            margin: 20px 0;
            border: 1px solid black;
            padding: 20px;
            background-color: #eee:
          }

          td {
            padding: 0 10px;
          }

          tr {
            padding: 10px;
          }

          .exercise {
          }
        `}</style>
      </div>
    );
  } else {
    return null;
  }
};

export default workoutTable;
