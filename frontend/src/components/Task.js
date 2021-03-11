import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";
import EditTask from "../components/EditTask";
import { parseISO } from "date-fns";
import { Trash } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import taskService from "../services/task.service";
import metricService from "../services/metric.service";
import CreateTask from "../components/CreateTask";

const Task = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <h1>An error has occured</h1>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  async function fetchData() {
    await TaskService.getTasks()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }

  const taskUpdated = () => {
    console.log("updated from props");
    fetchData();
  };

  const deleteTask = (task) => {
    taskService.deleteTask(task);

    console.log(task);
    metricService.registerClick("604a3901f853c400c64502c0");

    taskUpdated();
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d._id}>
                <td>{d.title}</td>
                <td>{d.description}</td>
                <td> {parseISO(d.dueDate).toDateString()}</td>
                <td>
                  <EditTask taskId={d._id} taskUpdated={taskUpdated} />
                </td>
                <td>
                  <Trash onClick={() => deleteTask(d)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateTask taskUpdated={taskUpdated} />
      </header>
    </div>
  );
};

export default Task;
