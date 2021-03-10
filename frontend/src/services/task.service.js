import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const getTasks = () => {
  return axios.get(API_URL + "/");
};

const deleteTask = (task) => {
  console.log("Deleting task: " + task.title + "ID: " + task._id);
  return axios.delete(API_URL + "/delete/" + task._id);
};

export default {
  getTasks,
  deleteTask,
};
