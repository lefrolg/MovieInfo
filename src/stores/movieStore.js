import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {getMovieById, getSimilarMovies} from "@/services/movies.js";

export const useMovieStore = defineStore('movie', () => {
  const movie = ref({});
  const similarMovies = ref([]);
  const isLoading = ref(false);

  async function setMovieData(id) {
    emptyMovie()
    try {
      isLoading.value = true;
      const movieData = await getMovieById(id);
      movie.value = movieData.data;
      isLoading.value = false;
    } catch (e) {
      console.error(e)
      isLoading.value = false;
    }
  }

  async function setSimilarMovies(id) {
    try {
      const similarMoviesData = await getSimilarMovies(id, 1)
      similarMovies.value = similarMoviesData.data.results
    } catch (e) {
      console.error(e)
    }
  }

  function emptyMovie() {
    movie.value = {};
    similarMovies.value = []
  }

  const movieYear = computed(() => {
    return movie.value?.release_date
      ? new Date(movie.value.release_date).getFullYear()
      : '';
  })

  const genres = computed(() => {
    return movie.value?.genres ? movie.value.genres.map(g => g.name).join(', ') : '';
  })

  const countries = computed(() => {
    return movie.value?.production_countries ? movie.value.production_countries.map(g => g.name).join(', ') : '';
  })

  return {movie, similarMovies, setMovieData, setSimilarMovies, emptyMovie, movieYear, genres, countries, isLoading}
})
