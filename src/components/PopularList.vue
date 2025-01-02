<script setup>

import {computed, onMounted, ref, useTemplateRef} from "vue";
import {getPopularMovies} from "@/services/movies.js";
import MovieCard from "@/components/MovieCard.vue";

const popularMoviesSet = ref(new Set());
const currentPage = ref(1);
const totalPages = ref(0);
const totalResults = ref(0);

const loadMoreTrigger = useTemplateRef('load-more-trigger');
const isLoading = ref(false);
const options = {
  root: null,
  threshold: '0',
};
const observer = new IntersectionObserver(observerCallback, options);

onMounted(() => {
  observer.observe(loadMoreTrigger.value);
})

function observerCallback(entries){
  if (!entries[0].isIntersecting) return;

  if (totalResults.value && popularMovies.value.length >= totalResults.value) {
    return;
  }

  if (isLoading.value) return;
  fetchPopularMoviesList()
}

async function fetchPopularMoviesList() {
  // TODO: refactor handle errors
  try {
    isLoading.value = true;
    const response = await getPopularMovies(currentPage.value)
    response.data.results.forEach(movie => {
      popularMoviesSet.value.add(movie)
    })
    totalPages.value = response.data.total_pages;
    totalResults.value = response.data.total_results;
    currentPage.value++;
    isLoading.value = false;
  } catch (e) {
    console.error(e)
    isLoading.value = false;
  }
}

const popularMovies = computed(() => Array.from(popularMoviesSet.value));

</script>

<template>
  <v-row v-if="popularMovies.length">
    <v-col cols="3" v-for="movie of popularMovies" :key="movie?.id">
      <movie-card
        :poster-url="movie?.poster_path || ''"
        :rating="movie?.vote_average || ''"
        :release-date="movie?.release_date || ''"
        :title="movie?.title || ''"
        :id="movie?.id"
      />
    </v-col>
  </v-row>
  <div ref="load-more-trigger"></div>
  <div class="text-center" v-if="isLoading">
    <v-icon class="loading" size="x-large" color="orange" icon="mdi-loading"></v-icon>
  </div>
</template>

<style scoped>
.loading{
  animation: rotateSpinner 1s infinite linear;
}
@keyframes rotateSpinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
