import axios from "axios";

const API_URL = "http://localhost:8080/api/metrics";

const registerClick = (metricId) => {
  console.log("a click has been logged");
  return axios.post(API_URL + "/registerClick/" + metricId);
};

const metricService = {
  registerClick,
};

export default metricService;
