const workoutTable = ({ exercises, handleAddWorkout }) => {
  const generateSets = (exercise) => {
    console.log(exercise);
    const sets = [];
    for (let i = 0; i < exercise.sets; i++) {
      sets.push(
        <tr>
          <td>{i + 1}</td>
          <td>{exercise.weight}</td>
          <td>{exercise.reps}</td>
        </tr>
      );
    }
    console.log(sets);
    return sets;
  };
  if (exercises.length !== 0) {
    return (
      <div className="container">
        <h1>New Workout</h1>
        {exercises.map((exercise) => {
          return (
            <div className="exercise" key={exercise.name}>
              <h2>{exercise.name}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Weight</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>{generateSets(exercise)}</tbody>
              </table>
            </div>
          );
        })}

        <button onClick={handleAddWorkout}>Save Workout</button>
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
