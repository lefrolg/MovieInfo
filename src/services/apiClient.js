import axios from "axios";

const apiEndpoint = import.meta.env.VITE_TMDB_API_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const apiClient = axios.create({
  baseURL: apiEndpoint,
  headers: {
    Authorization: "Bearer " + apiKey,
    "Content-type": "application/json",
  },
});

export default apiClient;
