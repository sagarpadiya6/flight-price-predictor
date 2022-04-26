import axios from "axios";

const BASE_URL = "http://localhost:4005";

export const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
});

export const apiPrivate = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
