import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";

const Task = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    TaskService.getTasks().then((res) => setState(res.data));
  });

  return (
    <div className="container">
      <header className="jumbotron">
        <>
          <ul>
            {state.map((d) => (
              <li key={d._id}>
                Title: {d.title} Description: {d.description}
              </li>
            ))}
          </ul>
        </>
      </header>
    </div>
  );
};

// {workers.map((worker) => (
//     <li key={worker.id}>
//       Worker {worker.id} has {worker.intervals.length} free intervals
//     </li>

export default Task;
