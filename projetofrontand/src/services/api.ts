import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // URL base que será substituída pela do backend real
});

export default api;
