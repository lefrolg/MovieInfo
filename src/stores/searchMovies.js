import {defineStore} from "pinia";
import {ref} from "vue";
import {getMoviesByQuery} from "@/services/movies.js";

export const useSearchMoviesStore = defineStore("searchMovies", () => {
    const searchResults = ref([]);
    const currentPage = ref(1);
    const totalResults = ref(0);
    const isLoading = ref(false);

    async function fetchSearchMovies(searchQuery) {
        if (!searchQuery) {
            searchResults.value = [];
            totalResults.value = 0;
            currentPage.value = 1
            return
        }
        // TODO: refactor handle errors
        try {
            isLoading.value = true;
            const response = await getMoviesByQuery(searchQuery, currentPage.value)
            if (currentPage.value === 1) {
                searchResults.value = response.data.results
            } else {
                searchResults.value.push(...response.data.results)
            }
            totalResults.value = response.data.total_results;
            isLoading.value = false;
        } catch (e) {
            console.error(e)
            isLoading.value = false;
        }
    }
    return {currentPage, totalResults, isLoading, fetchSearchMovies, searchResults}
})
