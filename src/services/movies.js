import apiClient from "@/services/apiClient.js";

/**
 * Get list of popular movies
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getPopularMovies(page) {
  return apiClient.get('movie/popular?language=en-US&page=' + page)
}

/**
 * Get details by internal movie id
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getMovieById(id) {
  return apiClient.get(`/movie/${id}?language=en-US`)
}
