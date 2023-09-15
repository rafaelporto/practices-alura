import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:8010/api/v2/',
});

export default http;
