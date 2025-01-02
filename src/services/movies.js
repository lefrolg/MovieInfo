import apiClient from "@/services/apiClient.js";

export function getPopularMovies(page) {
  return apiClient.get('movie/popular?language=en-US&page=' + page)
}

