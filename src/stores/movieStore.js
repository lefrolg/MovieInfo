import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {getMovieById} from "@/services/movies.js";

export const useMovieStore = defineStore('movie', () => {
    const movie = ref({});

    async function setMovieData(id) {
        const movieData = await getMovieById(id);
        movie.value = movieData.data;
    }

    const movieYear = computed(() => {
        return movie.value?.release_date
            ? new Date(movie.value.release_date).getFullYear()
            : '';
    })

    const genres = computed(() => {
        return movie.value?.genres ? movie.value.genres.map(g => g.name).join(', ') : '';
    })

    return {movie, setMovieData, movieYear, genres}
})
