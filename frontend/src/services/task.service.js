import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const getTasks = () => {
  return axios.get(API_URL + "/");
};

const getById = (taskId) => {
  return axios.get(API_URL + "/" + taskId);
};

const updateTask = (taskId, task) => {
  console.log("Task: " + taskId + "is being updated with body: " + task);
  return axios.post(API_URL + "/update/" + taskId, task.dueDate);
};

const deleteTask = (task) => {
  console.log("Deleting task: " + task.title + "ID: " + task._id);
  return axios.delete(API_URL + "/delete/" + task._id);
};

const taskService = {
  getTasks,
  deleteTask,
  getById,
  updateTask,
};

export default taskService;
