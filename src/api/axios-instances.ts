import axios from "axios";

export const MAIN_API_URL = "http://localhost:3000/";

export const mainApi = axios.create({
  baseURL: MAIN_API_URL
});
