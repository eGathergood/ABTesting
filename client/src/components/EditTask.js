import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";
import axios from "axios";
import taskService from "../services/task.service";
import metricService from "../services/metric.service";

import { Pencil } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditTask(props) {
  const [taskData, setTaskData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());
  const [currentTaskId, setCurrentTaskId] = useState();

  const handleClose = () => {
    setShow(false);
  };

  const handleUpdate = () => {
    async function update() {
      await axios
        .post("/api/tasks/update/" + currentTaskId, taskBody)
        .then((res) => {
          console.log(res.data);
          props.taskUpdated();
          setShow(false);
        })
        .catch((error) => {
          setError(true);
        });
    }
    update();
  };

  const handleShow = () => {
    async function fetchData() {
      await TaskService.getById(taskData)
        .then((res) => {
          setData(res.data);
          metricService.registerClick("604a6747398d790a3f901863");

          setShow(true);
        })
        .catch((error) => {
          setError(true);
        });
    }
    fetchData();
  };

  useEffect(() => {
    setTaskData(props.taskId);
    setCurrentTaskId(data._id);
    setTitle(data.title);
    setDescription(data.description);
    setDate(data.dueDate);
  }, [props.taskId, data.title, data.description, data.dueDate, data._id]);

  if (error) {
    return <h1>An error has occured</h1>;
  }

  const handleDelete = (task) => {
    taskService.deleteTask(task);
    metricService.registerClick("604a6747398d790a3f901863");
    props.taskUpdated();
    handleClose();
  };

  const deleteTaskBody = {
    _id: currentTaskId,
    title: title,
    description: description,
    dueDate: new Date(date),
  };

  const taskBody = {
    title: title,
    description: description,
    dueDate: new Date(date),
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
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(newTitle) =>
                  setTitle(newTitle.target.value.toString())
                }
              />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(deleteTaskBody)}>
            DELETE
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;
