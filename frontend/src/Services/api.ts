import axios from "axios";

const api = axios.create({
  baseURL: "http://3.91.230.251:3333",
});

export default api;
