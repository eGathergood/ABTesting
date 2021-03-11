import axios from "axios";

const API_URL = process.env.API_URL + "/api/metrics";

const registerClick = (metricId) => {
  console.log("a click has been logged");
  return axios.post(API_URL + "/registerClick/" + metricId);
};

const resetClicks = (metricId) => {
  console.log("clicks of" + { metricId } + "have been reset");
  return axios.post(API_URL + "/resetClicks/" + metricId);
};

const getMetrics = () => {
  console.log("object");
  return axios.get(API_URL + "/");
};

const metricService = {
  registerClick,
  getMetrics,
  resetClicks,
};

export default metricService;
