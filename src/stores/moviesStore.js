import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getPopularMovies} from "@/services/movies.js";

export const usePopularMoviesStore = defineStore("movies", () => {
    const popularMoviesSet = ref(new Set());
    const currentPage = ref(1);
    const totalResults = ref(0);
    const isLoading = ref(false);

    async function fetchPopularMoviesList() {
        // TODO: refactor handle errors
        try {
            isLoading.value = true;
            const response = await getPopularMovies(currentPage.value)
            response.data.results.forEach(movie => {
                popularMoviesSet.value.add(movie)
            })
            totalResults.value = response.data.total_results;
            currentPage.value++;
            isLoading.value = false;
        } catch (e) {
            console.error(e)
            isLoading.value = false;
        }
    }

    const popularMovies = computed(() => Array.from(popularMoviesSet.value));

    return {popularMoviesSet, currentPage, totalResults, isLoading , fetchPopularMoviesList, popularMovies}
})
