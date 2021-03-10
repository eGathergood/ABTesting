import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";
import { parseISO } from "date-fns";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import taskService from "../services/task.service";

const Task = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
    fetchData();
  }, []);

  if (error) {
    return <h1>An error has occured</h1>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(e);
  }

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
                  <Pencil onClick={() => console.log(d.title)} />
                </td>
                <td>
                  <Trash onClick={() => taskService.deleteTask(d)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default Task;
