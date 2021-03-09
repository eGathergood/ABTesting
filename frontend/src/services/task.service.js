import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const getTasks = () => {
  return axios.get(API_URL + "/");
};

export default {
  getTasks,
};
