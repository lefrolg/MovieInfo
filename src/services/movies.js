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

/**
 * Get the similar movies by movie id
 * @param id
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getSimilarMovies(id, page) {
  return apiClient.get(`/movie/${id}/similar?language=en-US&page=${page}`)
}

/**
 * Get movies by query search
 * @param query
 * @param page
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getMoviesByQuery(query, page  = 1) {
  const searchParameters = new URLSearchParams({query, page})
  return apiClient.get(`/search/movie?${searchParameters.toString()}`)
}
