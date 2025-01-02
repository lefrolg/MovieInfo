import apiClient from "@/services/apiClient.js";

export function getPopularMovies(page) {
  return apiClient.get('movie/popular?language=en-US&page=' + page)
}


export function getMovieById(id) {
  return apiClient.get(`/movie/${id}?language=en-US`)
}
