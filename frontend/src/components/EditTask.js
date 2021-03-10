import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";
import { formatISO } from "date-fns";
import axios from "axios";

import { Pencil } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditTask(taskId) {
  const [taskData, setTaskData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());
  const [currentTaskId, setCurrentTaskId] = useState();

  const handleClose = () => setShow(false);

  const handleShow = () => {
    async function fetchData() {
      await TaskService.getById(taskData.taskId)
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setShow(true);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
    fetchData();
  };

  useEffect(() => {
    setTaskData(taskId);
    setCurrentTaskId(data._id);
    setTitle(data.title);
    setDescription(data.description);
    setDate(data.dueDate);
  }, [taskId, data.title, data.description, data.dueDate, data._id]);

  if (error) {
    return <h1>An error has occured</h1>;
  }
  //   if (loading) {
  //     return <h1>Loading...</h1>;
  //   }

  const taskBody = {
    title: title,
    description: description,
    dueDate: new Date(date),
  };

  const tester = () => {
    axios
      .post("http://localhost:8080/api/tasks/update/" + currentTaskId, taskBody)
      .then((res) => console.log(res.data));
  };

  const updateTask = () => {
    async function update() {
      await TaskService.updateTask(data._id, taskBody)
        .then((res) => console.log(res.data))
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
    update();
  };

  return (
    <>
      <Pencil onClick={handleShow}>Launch demo modal</Pencil>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(newTitle) =>
                  setTitle(newTitle.target.value.toString())
                }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                {data.taskId}
              </Form.Text>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(newDescription) =>
                  setDescription(newDescription.target.value.toString())
                }
              />
              <Form.Label>DueDate</Form.Label>

              <DatePicker
                selected={new Date(date)}
                onChange={(date) => setDate(date)}
              />
            </Form.Group>
          </Form>
          <p>Task Id: {taskData.taskId} </p>
          {/* <p>Task Title: {title}</p> */}
          <p>Task Due Date: </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => tester()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;
