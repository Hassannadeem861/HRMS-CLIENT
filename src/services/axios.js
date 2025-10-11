import axios from "axios";

const Api = axios.create({
  baseURL: "https://human-resource-management-system-ep.vercel.app",
  // https://human-resource-management-system-tw.vercel.app/
  // baseURL: "http://localhost:8081",
});

export default Api