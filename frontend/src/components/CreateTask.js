import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTask(props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    async function create() {
      await axios
        .post("http://localhost:8080/api/tasks/add", taskBody)
        .then((res) => {
          console.log(res.data);
          props.taskUpdated();
          setShow(false);
        })
        .catch((error) => {
          setError(true);
        });
    }
    create();
  };

  const taskBody = {
    title: title,
    description: description,
    dueDate: new Date(date),
  };

  return (
    <>
      <Button onClick={handleShow}>Create Task</Button>

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreate()}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTask;
